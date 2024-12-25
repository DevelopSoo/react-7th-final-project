import supabase from "../utils/supabase";

type Feed = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  userId: string;
};

export const fetchFeeds = async () => {
  const { data, error } = await supabase.from("feeds").select("*");
  if (error) throw error;
  return data;
};

export const fetchFeedById = async (id: string | undefined): Promise<Feed> => {
  if (!id) throw new Error("id는 필수입니다");
  const { data, error } = await supabase.from("feeds").select("*").eq("id", id);
  if (error) throw error;
  return data[0];
};

export const createFeed = async ({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) => {
  const { data, error } = await supabase.from("feeds").insert({
    title,
    content,
    userId: userId,
  });
  if (error) throw error;
  return data;
};

export const editFeed = async ({
  feedId,
  userId,
  title,
  content,
}: {
  feedId: string;
  userId: string;
  title: string;
  content: string;
}) => {
  const { error } = await supabase
    .from("feeds")
    .update({
      title,
      content,
    })
    .eq("id", feedId)
    .eq("userId", userId);
  if (error) throw error;
};

export const deleteFeed = async ({
  userId,
  feedId,
}: {
  userId: string;
  feedId: string;
}) => {
  const { error } = await supabase
    .from("feeds")
    .delete()
    .eq("id", feedId)
    .eq("userId", userId);
  if (error) throw error;
};
