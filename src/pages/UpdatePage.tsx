import FeedForm from "../components/FeedForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editFeed, fetchFeedById } from "../api/feedApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export default function UpdatePage() {
	const { id } = useParams();
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
		editFeedMutation.mutate();
	}

	const { data } = useQuery({
		queryKey: ["feed", id],
		queryFn: () => fetchFeedById(id),
	})

	useEffect(() => {
		if (data) {
			setValues({
				title: data.title,
				content: data.content,
			});
		}
	}, [data])

	const queryClient = useQueryClient();
	const editFeedMutation = useMutation({
		mutationFn: () => {
			if (!id) throw new Error("id가 없습니다");
			if (!user?.id) throw new Error("로그인 후 이용 가능합니다.");
			return editFeed({
				feedId: id,
				userId: user?.id,
				...values,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds"] });
			navigate("/");
		},
	});

	return (
		<FeedForm
			title={values.title}
			content={values.content}
			onChange={handleChange}
			onSubmit={handleSubmit}
			pageTitle="글 수정">
			<button className="bg-yellow-500 text-white px-4 py-2 rounded-lg">수정</button>
		</FeedForm>
	)
}
