import { Link } from "react-router-dom";
import Feed from "../components/Feed";
import { useQuery } from "@tanstack/react-query";
import { fetchFeeds } from "../api/feedApi";


export default function Home() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["feeds"],
		queryFn: fetchFeeds,
	});

	return (
		<>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">글 목록</h1>
				<Link to="/feeds/create" className="bg-blue-500 text-white px-4 py-2 rounded-md">
					글쓰기
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				{isLoading && <div>Loading...</div>}
				{error && <div>Error: {error.message}</div>}
				{data && data.map((feed) => <Feed key={feed.id} feed={feed} />)}
			</div >
		</>
	);
}
