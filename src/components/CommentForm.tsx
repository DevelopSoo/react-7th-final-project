import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/commentApi";

export default function CommentForm({ feedId }: { feedId: string | undefined }) {
	const { user } = useAuthStore();

	const [comment, setComment] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	const queryClient = useQueryClient();

	const commentMutation = useMutation({
		mutationFn: () => {
			if (!user) throw new Error("로그인 후 이용해주세요");
			if (!feedId) throw new Error("feedId가 없습니다");
			return addComment({
				feedId: feedId,
				userId: user.id,
				content: comment,
			});
		},
		onSuccess: () => {
			alert("댓글 작성 완료");
			queryClient.invalidateQueries({ queryKey: ["feeds", feedId, "comments"] });
			setComment("");
		},
		onError: (error) => {
			alert(error.message);
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		commentMutation.mutate();
	};


	return (
		<div className="flex flex-col gap-3 bg-white shadow-md p-6 rounded-lg">
			<h2 className="text-blue-950 font-semibold">댓글 작성</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3">
				<textarea
					value={comment}
					onChange={handleChange}
					className="border border-gray-200 rounded-lg h-[100px] p-3 resize-none"
				/>
				<button
					type="submit"
					className="self-end px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
				>
					작성
				</button>
			</form>
		</div>
	)
}