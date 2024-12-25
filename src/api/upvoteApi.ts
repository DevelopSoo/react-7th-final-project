import supabase from "../utils/supabase";

export const fetchUpvotesCountByFeedId = async (feedId: string) => {
  const { count, error } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw error;
  return count;
};
