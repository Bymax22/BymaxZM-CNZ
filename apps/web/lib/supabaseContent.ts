import { supabase, supabaseEnabled } from './supabaseClient';

export type ContentComment = {
  id: string;
  content: string;
  created_at: string;
};

const SUPABASE_TABLES = {
  likes: 'content_like_counts',
  comments: 'content_comments',
  newsletter: 'newsletter_subscriptions',
};

export async function fetchLikeCount(contentType: string, contentId: string) {
  if (!supabaseEnabled || !supabase) {
    return 0;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLES.likes)
    .select('likes')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .single();

  if (error) {
    console.error('fetchLikeCount error', error);
    return 0;
  }

  return data?.likes ?? 0;
}

export async function updateLikeCount(contentType: string, contentId: string, delta: number) {
  if (!supabaseEnabled || !supabase) {
    return 0;
  }

  const current = await fetchLikeCount(contentType, contentId);
  const nextCount = Math.max(0, current + delta);

  const { error } = await supabase
    .from(SUPABASE_TABLES.likes)
    .upsert(
      {
        content_type: contentType,
        content_id: contentId,
        likes: nextCount,
      },
      { onConflict: 'content_type,content_id' }
    );

  if (error) {
    console.error('updateLikeCount error', error);
    return current;
  }

  return nextCount;
}

export async function fetchComments(contentType: string, contentId: string) {
  if (!supabaseEnabled || !supabase) {
    return [] as ContentComment[];
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLES.comments)
    .select('id, content, created_at')
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('fetchComments error', error);
    return [];
  }

  return (data ?? []) as ContentComment[];
}

export async function postComment(contentType: string, contentId: string, content: string) {
  if (!supabaseEnabled || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLES.comments)
    .insert([{ content_type: contentType, content_id: contentId, content }])
    .select('id, content, created_at')
    .single();

  if (error) {
    console.error('postComment error', error);
    return null;
  }

  return data as ContentComment;
}

export async function subscribeNewsletter(email: string) {
  if (!supabaseEnabled || !supabase) {
    return { error: new Error('Supabase not configured') };
  }

  const { error } = await supabase
    .from(SUPABASE_TABLES.newsletter)
    .insert([{ email }]);

  return { error };
}

export function subscribeToLikeCount(
  contentType: string,
  contentId: string,
  onUpdate: (likes: number) => void
) {
  if (!supabaseEnabled || !supabase) {
    return () => {};
  }

  const client = supabase;
  const channel = client
    .channel(`content-likes-${contentType}-${contentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: SUPABASE_TABLES.likes,
        filter: `content_type=eq.${contentType}&content_id=eq.${contentId}`,
      },
      async () => {
        const latest = await fetchLikeCount(contentType, contentId);
        onUpdate(latest);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: SUPABASE_TABLES.likes,
        filter: `content_type=eq.${contentType}&content_id=eq.${contentId}`,
      },
      async () => {
        const latest = await fetchLikeCount(contentType, contentId);
        onUpdate(latest);
      }
    )
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}

export function subscribeToComments(
  contentType: string,
  contentId: string,
  onInsert: (comment: ContentComment) => void
) {
  if (!supabaseEnabled || !supabase) {
    return () => {};
  }

  const client = supabase;

  const channel = client
    .channel(`content-comments-${contentType}-${contentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: SUPABASE_TABLES.comments,
        filter: `content_type=eq.${contentType}&content_id=eq.${contentId}`,
      },
      (payload) => {
        if (payload.new) {
          onInsert({
            id: payload.new.id,
            content: payload.new.content,
            created_at: payload.new.created_at,
          });
        }
      }
    )
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}
