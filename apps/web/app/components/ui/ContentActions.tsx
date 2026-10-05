'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FaCommentAlt, FaHeart, FaShareAlt } from 'react-icons/fa';
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

type ContentActionsProps = {
  contentType?: string;
  contentId: string | number;
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
  contextLabel?: string;
  shareUrl?: string;
};

export function ContentActions({
  contentType = 'initiative',
  contentId,
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0,
  contextLabel = 'this content',
  shareUrl = '',
}: ContentActionsProps) {
  const { requireAuthentication, authPrompt } = useAuthPrompt();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [shares, setShares] = useState(initialShares);
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState<CommentItem[]>([]);
  const [feedback, setFeedback] = useState('');
  const [likePending, setLikePending] = useState(false);
  const seenCommentIds = useRef(new Set<string>());

  useEffect(() => {
    let cleanupLikes = () => {};
    let cleanupComments = () => {};

    let active = true;
    async function loadInitialData() {
      const [likeCount, storedComments, shareCount] = await Promise.all([
        fetchLikeCount(contentType, contentId),
        fetchComments(contentType, contentId),
        fetchLikeCount(`${contentType}_share`, contentId),
      ]);

      if (!active) return;
      setLikes(likeCount);
      setComments(storedComments.length);
      setCommentList(storedComments.map((comment) => ({ id: comment.id, content: comment.content })));
      setShares(shareCount);
      seenCommentIds.current = new Set(storedComments.map((comment) => comment.id));

      cleanupLikes = subscribeToLikeCount(contentType, contentId, setLikes);
      const cleanupShares = subscribeToLikeCount(`${contentType}_share`, contentId, setShares);
      cleanupComments = subscribeToComments(contentType, contentId, (comment) => {
        if (seenCommentIds.current.has(comment.id)) return;
        seenCommentIds.current.add(comment.id);
        setCommentList((current) => {
          return [{ id: comment.id, content: comment.content }, ...current];
        });
        setComments((value) => value + 1);
      });
      cleanupShareUpdates = cleanupShares;
    }

    let cleanupShareUpdates = () => {};
    void loadInitialData();
    return () => {
      active = false;
      cleanupLikes();
      cleanupShareUpdates();
      cleanupComments();
    };
  }, [contentId, contentType]);

  const toggleLike = async () => {
    if (likePending) return;
    const performLike = async () => {
      const nextLiked = !liked;
      setLikePending(true);
      setLiked(nextLiked);
      setLikes((count) => Math.max(0, count + (nextLiked ? 1 : -1)));
      try {
        setLikes(await updateLikeCount(contentType, contentId, nextLiked ? 1 : -1));
      } finally {
        setLikePending(false);
      }
    };
    if (!requireAuthentication(performLike)) return;
    await performLike();
  };

  const handleShare = async () => {
    const url = shareUrl || window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Read more about ${contextLabel}`,
          text: `Check out this update from Care for Nature Zambia.`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setFeedback('Link copied to clipboard');
      }
      setShares(await updateLikeCount(`${contentType}_share`, contentId, 1));
    } catch {
      setFeedback('Unable to share from this browser.');
    } finally {
      window.setTimeout(() => setFeedback(''), 2500);
    }
  };

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitComment = async () => {
      const trimmed = commentText.trim();
      if (!trimmed) return;
      const savedComment = await postComment(contentType, contentId, trimmed);
      if (savedComment) {
        if (!seenCommentIds.current.has(savedComment.id)) {
          seenCommentIds.current.add(savedComment.id);
          setCommentList((items) => [{ id: savedComment.id, content: savedComment.content }, ...items]);
          setComments((value) => value + 1);
        }
        setCommentText('');
        setFeedback('Comment added');
      } else {
        setFeedback('Unable to post comment. Try again.');
      }
      window.setTimeout(() => setFeedback(''), 2500);
    };
    if (!requireAuthentication(submitComment)) return;
    await submitComment();
  };

  return (
    <div id="engagement" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Engage with this story
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Like, share, or leave a comment to help others discover this content.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={toggleLike}
            disabled={likePending}
            className={`inline-flex items-center gap-2 rounded-full border-0 px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-60 ${
              liked
                ? 'bg-[#d66f0b]'
                : 'bg-[#f79021] hover:bg-[#df7d16]'
            }`}
          >
            <FaHeart className="h-4 w-4" />
            {liked ? 'Liked' : 'Like'}
          </button>
          <button
            type="button"
            onClick={() => {
              const focusComment = () => commentInputRef.current?.focus();
              if (!requireAuthentication(focusComment)) return;
              focusComment();
            }}
            className="inline-flex items-center gap-2 rounded-full border-0 bg-[#f79021] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#df7d16]"
          >
            <FaCommentAlt className="h-4 w-4" />
            Comment
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border-0 bg-[#f79021] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#df7d16]"
          >
            <FaShareAlt className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-4 text-center">
          <p className="text-2xl font-semibold text-[#029346]">{likes}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Likes</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-center">
          <p className="text-2xl font-semibold text-[#0C4726]">{comments}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Comments</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 text-center">
          <p className="text-2xl font-semibold text-[#F79021]">{shares}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-500">Shares</p>
        </div>
      </div>

      <form onSubmit={handleCommentSubmit} className="mt-6 space-y-3">
        <label htmlFor="comment" className="sr-only">
          Add a public comment
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            ref={commentInputRef}
            id="comment"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Write a comment..."
            className="min-w-0 flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-[#029346] focus:ring-2 focus:ring-[#029346]/10"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-3xl bg-[#029346] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#027437]"
          >
            Post Comment
          </button>
        </div>
        {feedback ? (
          <p className="text-sm text-emerald-700">{feedback}</p>
        ) : (
          <p className="text-sm text-slate-500">Your comments appear instantly in this preview area.</p>
        )}
      </form>

      {authPrompt}

      {commentList.length > 0 && (
        <div className="mt-6 space-y-3">
          {commentList.slice(0, 3).map((comment) => (
            <div key={comment.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-800">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
