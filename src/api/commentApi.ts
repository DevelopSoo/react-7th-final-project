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
    .eq("feed_id", feedId);
  if (error) throw error;
  return data;
};
