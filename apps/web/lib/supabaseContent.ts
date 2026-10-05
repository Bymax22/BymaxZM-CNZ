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

export async function fetchLikeCount(contentType: string, contentId: string | number) {
  const normalizedContentId = String(contentId);
  if (!supabaseEnabled || !supabase) {
    return 0;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLES.likes)
    .select('likes')
    .eq('content_type', contentType)
    .eq('content_id', normalizedContentId)
    .maybeSingle();

  if (error) {
    console.error('fetchLikeCount error', error);
    return 0;
  }

  return data?.likes ?? 0;
}

export async function updateLikeCount(contentType: string, contentId: string | number, delta: number) {
  const normalizedContentId = String(contentId);
  if (!supabaseEnabled || !supabase) {
    return 0;
  }

  const { data, error } = await supabase.rpc('increment_content_counter', {
    p_content_type: contentType,
    p_content_id: normalizedContentId,
    p_delta: delta,
  });

  if (error) {
    console.error('updateLikeCount error', error);
    return fetchLikeCount(contentType, contentId);
  }

  return Number(data ?? 0);
}

export async function fetchComments(contentType: string, contentId: string | number) {
  const normalizedContentId = String(contentId);
  if (!supabaseEnabled || !supabase) {
    return [] as ContentComment[];
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLES.comments)
    .select('id, content, created_at')
    .eq('content_type', contentType)
    .eq('content_id', normalizedContentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('fetchComments error', error);
    return [];
  }

  return (data ?? []) as ContentComment[];
}

export async function postComment(contentType: string, contentId: string | number, content: string) {
  const normalizedContentId = String(contentId);
  if (!supabaseEnabled || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLES.comments)
    .insert([{ content_type: contentType, content_id: normalizedContentId, content }])
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
  contentId: string | number,
  onUpdate: (likes: number) => void
) {
  const normalizedContentId = String(contentId);
  if (!supabaseEnabled || !supabase) {
    return () => {};
  }

  const client = supabase;
  const matchesContent = (record: Record<string, any> | null | undefined) =>
    record?.content_id === normalizedContentId && record?.content_type === contentType;
  const refreshCount = async (record: Record<string, any> | null | undefined) => {
    if (matchesContent(record)) onUpdate(await fetchLikeCount(contentType, contentId));
  };
  const channel = client
    .channel(`content-likes-${contentType}-${normalizedContentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: SUPABASE_TABLES.likes,
        filter: `content_id=eq.${normalizedContentId}`,
      },
      async (payload) => {
        await refreshCount(payload.new);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: SUPABASE_TABLES.likes,
        filter: `content_id=eq.${normalizedContentId}`,
      },
      async (payload) => {
        await refreshCount(payload.new);
      }
    )
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}

export function subscribeToComments(
  contentType: string,
  contentId: string | number,
  onInsert: (comment: ContentComment) => void
) {
  const normalizedContentId = String(contentId);
  if (!supabaseEnabled || !supabase) {
    return () => {};
  }

  const client = supabase;
  const matchesContent = (record: Record<string, any> | null | undefined) =>
    record?.content_id === normalizedContentId && record?.content_type === contentType;

  const channel = client
    .channel(`content-comments-${contentType}-${normalizedContentId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: SUPABASE_TABLES.comments,
        filter: `content_id=eq.${normalizedContentId}`,
      },
      (payload) => {
        if (payload.new && matchesContent(payload.new)) {
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
