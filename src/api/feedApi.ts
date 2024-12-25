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
