import supabase from "../utils/supabase";

export const fetchCommentsCountByFeedId = async (feedId: string) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw error;
  return count;
};

export const fetchCommentsWithUserByFeedId = async (
  feedId: string | undefined
) => {
  if (!feedId) throw new Error("feedId는 필수입니다");
  const { data, error } = await supabase
    .from("comments")
    .select(
      `*, 
        user:user_id (
          id,
          email,
          nickname
        )
      `
    )
    .eq("feed_id", feedId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const addComment = async ({
  feedId,
  userId,
  content,
}: {
  feedId: string;
  userId: string;
  content: string;
}) => {
  const { error } = await supabase.from("comments").insert({
    feed_id: feedId,
    user_id: userId,
    content: content,
  });
  if (error) throw error;
};

export const deleteComment = async ({
  commentId,
  userId,
}: {
  commentId: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", userId);
  if (error) throw error;
};

export const editComment = async ({
  commentId,
  userId,
  content,
}: {
  commentId: string;
  userId: string;
  content: string;
}) => {
  const { error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .eq("user_id", userId);
  if (error) throw error;
};
