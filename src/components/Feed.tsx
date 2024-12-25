import { Link } from "react-router-dom";
import { FaAngleUp, FaCommentDots } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentsCountByFeedId } from "../api/commentApi";
import { fetchUpvotesCountByFeedId } from "../api/upvoteApi";

interface FeedProps {
	feed: {
		id: string;
		title: string;
		content: string;
		created_at: string;
	}
}

export default function Feed({ feed }: FeedProps) {
	const { data: commentsCount, isLoading: commentsCountLoading, error: commentsCountError } = useQuery({
		queryKey: ["feeds", feed.id, "comments", "count"],
		queryFn: () => fetchCommentsCountByFeedId(feed.id),
		enabled: !!feed.id,
	});

	const { data: upvotesCount, isLoading: upvotesCountLoading, error: upvotesCountError } = useQuery({
		queryKey: ["feeds", feed.id, "upvotes", "count"],
		queryFn: () => fetchUpvotesCountByFeedId(feed.id),
		enabled: !!feed.id,
	});

	return (
		<Link
			className="flex justify-between bg-white shadow-md p-6 rounded-lg"
			to={`/feeds/${feed.id}`}
		>
			<div>
				<button className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950">
					<FaAngleUp className="text-xs text-center font-bold" />
					{upvotesCountLoading && <div className="animate-pulse w-4 h-4 bg-gray-300 rounded-full" />}
					{!upvotesCountLoading && !upvotesCountError && <div className="font-bold">{upvotesCount}</div>}
				</button>
			</div >
			<div className="flex-1 px-10 min-w-0 flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h2 className="text-blue-950 text-xl font-bold">{feed.title}</h2>
					<p className="text-gray-600 truncate text-md">{feed.content}</p>
				</div>
				<p className="text-right text-xs text-gray-600">
					작성일: {new Date(feed.created_at).toLocaleDateString()}
				</p>
			</div >
			<div className="flex items-center gap-1 p-3 text-gray-600">
				<FaCommentDots className="text-gray-500 font-bold text-xl" />
				{commentsCountLoading && <div className="animate-pulse w-4 h-4 bg-gray-300 rounded-full" />}
				{!commentsCountLoading && !commentsCountError && <div className="font-bold">{commentsCount}</div>}
			</div>
		</Link >
	)
}
