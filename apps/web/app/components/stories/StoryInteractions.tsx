'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import {
  fetchComments,
  fetchLikeCount,
  postComment,
  subscribeToComments,
  subscribeToLikeCount,
  updateLikeCount,
} from '../../../lib/supabaseContent';
import { useAuthPrompt } from '../../hooks/useAuthPrompt';

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
  const { requireAuthentication, authPrompt } = useAuthPrompt();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<CommentItem[]>(
    initialComments.map((comment, index) => ({ id: `initial-${index}`, content: comment }))
  );
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    const cleanupLikes = subscribeToLikeCount('story', storyId, setLikes);
    const cleanupComments = subscribeToComments('story', storyId, (comment) => {
      setComments((current) => current.some((item) => item.id === comment.id)
        ? current
        : [{ id: comment.id, content: comment.content }, ...current]);
    });

    async function loadEngagement() {
      const [likeCount, storedComments] = await Promise.all([
        fetchLikeCount('story', storyId),
        fetchComments('story', storyId),
      ]);
      if (!mounted) return;
      setLikes(likeCount);
      setComments(storedComments.map((comment) => ({ id: comment.id, content: comment.content })));
    }

    void loadEngagement();
    return () => {
      mounted = false;
      cleanupLikes();
      cleanupComments();
    };
  }, [storyId]);

  async function handleToggleLike() {
    const toggle = async () => {
      const next = !liked;
      setLiked(next);
      setLikes((previous) => Math.max(0, previous + (next ? 1 : -1)));
      setLikes(await updateLikeCount('story', storyId, next ? 1 : -1));
    };
    if (!requireAuthentication(toggle)) return;
    await toggle();
  }

  async function handleAddComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submit = async () => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const savedComment = await postComment('story', storyId, trimmed);
      if (!savedComment) return;
      setComments((current) => current.some((item) => item.id === savedComment.id)
        ? current
        : [{ id: savedComment.id, content: savedComment.content }, ...current]);
      setText('');
    };
    if (!requireAuthentication(submit)) return;
    await submit();
  }

  async function handleShare() {
    try {
      const url = `${window.location.origin}/stories/${storyId}`;
      if (navigator.share) {
        await navigator.share({ title: 'Care for Nature Zambia story', url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // Ignore cancellation or unavailable share actions.
    }
  }

  return (
    <div id="engagement" className="mt-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => void handleToggleLike()} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${liked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
          <Heart size={16} className={liked ? 'text-emerald-700' : 'text-slate-700'} />
          <span>{likes}</span>
        </button>
        <button type="button" onClick={() => {
          const focusComment = () => commentInputRef.current?.focus();
          if (!requireAuthentication(focusComment)) return;
          focusComment();
        }} className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-slate-700">
          <MessageCircle size={16} /> <span>{comments.length}</span>
        </button>
        <button type="button" onClick={() => void handleShare()} className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-slate-700">
          <Share2 size={16} /> <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
        <input ref={commentInputRef} value={text} onChange={(event) => setText(event.target.value)} placeholder="Write a comment..." className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm" />
        <button type="submit" className="rounded-md bg-emerald-600 px-3 py-2 text-sm text-white">Comment</button>
      </form>

      {authPrompt}

      {comments.length > 0 && (
        <div className="mt-4 space-y-3">
          {comments.map((comment) => <div key={comment.id} className="rounded-md border bg-white px-3 py-2 text-sm text-slate-800">{comment.content}</div>)}
        </div>
      )}
    </div>
  );
}
