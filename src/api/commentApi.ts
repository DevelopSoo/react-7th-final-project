import supabase from "../utils/supabase";

export const fetchCommentsCountByFeedId = async (feedId: string) => {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw error;
  return count;
};
