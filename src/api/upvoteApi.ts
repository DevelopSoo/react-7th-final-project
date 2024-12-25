import supabase from "../utils/supabase";

export const fetchUpvotesCountByFeedId = async (feedId: string) => {
  const { count, error } = await supabase
    .from("upvotes")
    .select("*", { count: "exact", head: true })
    .eq("feed_id", feedId);
  if (error) throw error;
  return count;
};

export const fetchUpvotesByFeedId = async (feedId: string | undefined) => {
  if (!feedId) throw new Error("feedId는 필수입니다");
  const { data, error } = await supabase
    .from("upvotes")
    .select("*")
    .eq("feed_id", feedId);
  if (error) throw error;
  return data;
};

const insertUpvote = async ({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) => {
  const { error } = await supabase.from("upvotes").insert({
    feed_id: feedId,
    user_id: userId,
  });
  if (error) throw error;
};

const deleteUpvote = async ({
  feedId,
  userId,
}: {
  feedId: string;
  userId: string;
}) => {
  const { error } = await supabase
    .from("upvotes")
    .delete()
    .eq("feed_id", feedId)
    .eq("user_id", userId);
  if (error) throw error;
};

export const toggleUpvote = async ({
  feedId,
  userId,
  isUpvoted,
}: {
  feedId: string;
  userId: string;
  isUpvoted: boolean;
}) => {
  if (isUpvoted) {
    await deleteUpvote({ feedId, userId });
  } else {
    await insertUpvote({ feedId, userId });
  }
};
