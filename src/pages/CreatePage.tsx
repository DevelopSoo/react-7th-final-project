import FeedForm from "../components/FeedForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeed } from "../api/feedApi";
import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
	const { user } = useAuthStore();
	const navigate = useNavigate();
	const [values, setValues] = useState({
		title: "",
		content: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createFeedMutation.mutate();
	}

	const queryClient = useQueryClient();
	const createFeedMutation = useMutation({
		mutationFn: () => {
			if (!user?.id) throw new Error("유저가 없습니다");
			return createFeed({
				...values,
				userId: user?.id,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds"] });
			navigate("/");
		},
		onError: (error) => {
			alert(`글 작성 실패: ${error.message}`);
		},
	})


	return (
		<FeedForm
			title={values.title}
			content={values.content}
			onChange={handleChange}
			onSubmit={handleSubmit}
			pageTitle="글 추가">
			<button className="bg-blue-600 text-white px-4 py-2 rounded-lg">추가</button>
		</FeedForm>
	)
}
