import supabase from "../utils/supabase";

export const fetchFeeds = async () => {
  const { data, error } = await supabase.from("feeds").select("*");
  if (error) throw error;
  return data;
};
