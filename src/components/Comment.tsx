import { IoPersonCircleOutline } from "react-icons/io5";
import { useAuthStore } from "../stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, editComment } from "../api/commentApi";
import { useState } from "react";

type User = {
	id: string;
	email: string;
	nickname: string;
	img_url: string;
}

type Comment = {
	id: string;
	content: string;
	created_at: string;
	user: User
}

interface CommentProps {
	feedId: string | undefined;
	comment: Comment;
}

export default function Comment({ feedId, comment }: CommentProps) {
	const { user } = useAuthStore();
	const [isEditing, setIsEditing] = useState(false);

	const [editingComment, setEditingComment] = useState(comment.content);

	const queryClient = useQueryClient();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditingComment(e.target.value);
	}

	const handleEdit = () => {
		setIsEditing(true);
	}

	const handleEditCancel = () => {
		setIsEditing(false);
		setEditingComment(comment.content);
	}

	const handleEditSubmit = () => {
		editMutation.mutate();
		setIsEditing(false);
	}

	const editMutation = useMutation({
		mutationFn: () => {
			if (!user?.id) throw new Error("user가 없습니다");
			if (!feedId) throw new Error("feedId가 없습니다");
			return editComment({ commentId: comment.id, userId: user?.id, content: editingComment })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds", feedId, "comments"] });
		},
		onError: (error) => {
			alert(`수정 실패: ${error.message}`);
		},
	})

	const deleteMutation = useMutation({
		mutationFn: () => {
			if (!user?.id) throw new Error("user가 없습니다");
			if (!feedId) throw new Error("feedId가 없습니다");
			return deleteComment({ commentId: comment.id, userId: user?.id })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds", feedId, "comments"] });
		},
	});

	const handleDelete = () => {
		if (confirm("정말 삭제하시겠습니까?")) {
			deleteMutation.mutate();
		}
	}

	return (
		<>
			<div className="flex gap-2.5">
				{/* {user?.img_url ? <img src={user?.img_url} alt="profile" className="w-16 h-16 rounded-full pr-6" /> : } */}
				{comment.user.img_url ? <img src={comment.user.img_url} alt="profile" className="w-12 h-12 rounded-full mr-6" /> : <IoPersonCircleOutline className="w-12 h-12 rounded-full mr-6" />}
				{/* <IoPersonCircleOutline className="w-16 h-16 rounded-full pr-6" /> */}
				<div className="flex flex-1 flex-col gap-3">
					<div className="flex flex-col gap-1">
						<div className="text-slate-900 font-bold text-sm">
							{comment.user.nickname ? comment.user.nickname : comment.user.email}
						</div>
					</div>
					{isEditing ? (
						<textarea value={editingComment} onChange={handleChange}
							className="text-gray-500 border border-gray-400 p-2 rounded-md resize-none text-sm" />
					) : (
						<div className="text-gray-500">{comment.content}</div>
					)}
				</div>
				{user?.id === comment.user.id && (
					<div className="flex items-end gap-3">
						{isEditing ? (<>
							<button
								onClick={handleEditCancel}
								className="text-white bg-gray-500 px-4 py-2 rounded-md"
							>
								취소
							</button>
							<button
								onClick={handleEditSubmit}
								className="text-white bg-yellow-500 px-4 py-2 rounded-md"
							>
								완료
							</button>
						</>) : (<>
							<button
								onClick={handleEdit}
								className="text-white bg-yellow-500 px-4 py-2 rounded-md"
							>
								수정
							</button>
							<button
								onClick={handleDelete}
								className="text-white bg-red-500 px-4 py-2 rounded-md"
							>
								삭제
							</button>
						</>)}
					</div>
				)}
			</div>
			<hr className="m-0 border-t border-gray-200" />
		</>
	)
}