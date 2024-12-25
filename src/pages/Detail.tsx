import { FaCommentDots, FaAngleUp } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { useAuthStore } from "../stores/useAuthStore";
import { fetchFeedById } from "../api/feedApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUpvotesByFeedId, toggleUpvote } from "../api/upvoteApi";
import { fetchCommentsWithUserByFeedId } from "../api/commentApi";

export default function Detail() {
	const { id } = useParams();
	const { user } = useAuthStore();
	const queryClient = useQueryClient();

	const { data: feed } = useQuery({
		queryKey: ["feeds", id],
		queryFn: () => fetchFeedById(id),
	});

	const { data: upvotes } = useQuery({
		queryKey: ["feeds", id, "upvotes"],
		queryFn: () => fetchUpvotesByFeedId(id),
	});

	// TODO: 낙관적 업데이트 적용
	const upvoteMutation = useMutation({
		mutationFn: toggleUpvote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds", id, "upvotes"] });
		},
		onError: (error) => {
			alert(`추천 실패: ${error.message}`);
		},
	})

	const { data: comments } = useQuery({
		queryKey: ["feeds", id, "comments"],
		queryFn: () => fetchCommentsWithUserByFeedId(id),
	});

	const isUpvotedByMe = upvotes?.some((upvote) => upvote.user_id === user?.id);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<Link to="/" className="text-sm flex gap-2 p-2">
					<span className="text-blue-900 font-bold">{`<`}</span>
					<span className="text-gray-600">뒤로가기</span>
				</Link>
				<div className="flex gap-2.5">
					<Link to={`/feeds/update/${id}`} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
						수정
					</Link>
					<button className="bg-red-500 text-white px-4 py-2 rounded-md">
						삭제
					</button>
				</div>
			</div>
			<div className="bg-white p-6 flex justify-between rounded-lg">
				<div>
					<button
						onClick={() => {
							if (!user?.id) {
								alert("로그인 후 이용해주세요.");
								return;
							}

							if (user?.id === feed?.userId) {
								alert("본인이 작성한 글은 추천할 수 없습니다.");
								return;
							}

							if (isUpvotedByMe !== undefined) {
								upvoteMutation.mutate({ feedId: id, userId: user?.id, isUpvoted: isUpvotedByMe })
							}
						}}
						className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950">
						<FaAngleUp className="text-xs text-center font-bold" />
						<div className={`font-bold ${isUpvotedByMe ? 'text-red-500' : 'text-gray-600'}`}>{upvotes?.length}</div>
					</button>
				</div>

				<div className="flex-1 px-10 min-w-0 flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-gray-900 text-xl font-bold">{feed?.title}</h2>
						<p className="text-gray-600">{feed?.content}</p>
					</div>
					<p className="text-xs text-right text-gray-600">
						작성일: {feed ? new Date(feed.created_at).toLocaleDateString() : ''}
					</p>
				</div>

				<div className="flex items-center gap-1 p-3">
					<FaCommentDots className="text-gray-500 font-bold text-xl " />
					<div className="text-blue-950 font-bold text-sm" >
						{comments?.length}
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
				<h3 className="text-blue-950 font-semibold">{comments?.length} Comments</h3>
				{comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
			</div>
			<CommentForm />
		</div>
	)
}
