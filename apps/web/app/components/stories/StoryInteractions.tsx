"use client";

import { useEffect, useState, type FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import {
  fetchComments,
  fetchLikeCount,
  postComment,
  subscribeToComments,
  subscribeToLikeCount,
  updateLikeCount,
} from '../../../lib/supabaseContent';
import AuthPromptModal from '../AuthPromptModal';

type CommentItem = {
  id: string;
  content: string;
};

type Props = {
  storyId: string;
  initialComments?: string[];
  initialLikes?: number;
};

export default function StoryInteractions({ storyId, initialComments = [], initialLikes = 0 }: Props) {
  const { status } = useSession();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<CommentItem[]>(
    initialComments.map((comment, index) => ({ id: `initial-${index}`, content: comment }))
  );
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    let cleanupLikes = () => {};
    let cleanupComments = () => {};

    async function loadEngagement() {
      const [likeCount, storedComments] = await Promise.all([
        fetchLikeCount('story', storyId),
        fetchComments('story', storyId),
      ]);

      setLikes(likeCount);
      setComments(storedComments.map((comment) => ({ id: comment.id, content: comment.content })));

      cleanupLikes = subscribeToLikeCount('story', storyId, setLikes);
      cleanupComments = subscribeToComments('story', storyId, (comment) => {
        setComments((current) => {
          if (current.some((item) => item.id === comment.id)) return current;
          return [{ id: comment.id, content: comment.content }, ...current];
        });
      });
    }

    void loadEngagement();
    return () => {
      cleanupLikes();
      cleanupComments();
    };
  }, [storyId]);

  async function handleToggleLike() {
    if (status !== 'authenticated') {
      setShowAuthPrompt(true);
      return;
    }

    const next = !liked;
    setLiked(next);
    setLikes((previous) => Math.max(0, previous + (next ? 1 : -1)));

    const result = await updateLikeCount('story', storyId, next ? 1 : -1);
    setLikes(result);
  }

  async function handleAddComment(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    if (status !== 'authenticated') {
      setShowAuthPrompt(true);
      return;
    }

    const trimmed = text.trim();
    if (!trimmed) return;

    const savedComment = await postComment('story', storyId, trimmed);
    if (savedComment) {
      setComments((current) => {
        if (current.some((item) => item.id === savedComment.id)) return current;
        return [{ id: savedComment.id, content: savedComment.content }, ...current];
      });
      setText('');
    }
  }

  async function handleShare() {
    try {
      const url = typeof window !== 'undefined' ? window.location.origin + `/stories/${storyId}` : `/stories/${storyId}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="mt-6">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleLike}
          className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
            liked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
          }`}
        >
          <Heart size={16} className={liked ? 'text-emerald-700' : 'text-slate-700'} />
          <span>{likes}</span>
        </button>

        <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-slate-100 text-slate-700">
          <MessageCircle size={16} /> <span>{comments.length}</span>
        </button>

        <button onClick={handleShare} className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-slate-100 text-slate-700">
          <Share2 size={16} /> <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm"
        />
        <button type="submit" className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white">
          Comment
        </button>
      </form>

      <AuthPromptModal isOpen={showAuthPrompt} onClose={() => setShowAuthPrompt(false)} />

      {comments.length > 0 && (
        <div className="mt-4 space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="rounded-md border bg-white px-3 py-2 text-sm text-slate-800">
              {comment.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
