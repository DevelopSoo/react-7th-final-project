import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase.ts";

const Login = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			});

			if (error) {
				if (error?.message === "Invalid login credentials") {
					return alert("이메일 또는 비밀번호를 확인해주세요.");
				}
				throw error;
			}

			navigate("/");
		} catch (error: unknown) {
			return alert(`로그인에 실패했습니다. ${error}`);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">로그인</h1>
			<form
				className="flex flex-col gap-4 w-80"
				onSubmit={onSubmit}>
				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-sm">이메일</label>
					<input
						className="border border-gray-300 rounded-md p-2"
						id="email"
						name="email"
						type="email"
						placeholder="이메일을 입력해주세요."
						value={values.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label
						htmlFor="password"
						className="text-sm">
						비밀번호
					</label>
					<input
						id="password"
						name="password"
						type="password"
						className="border border-gray-300 rounded-md p-2"
						placeholder="비밀번호를 입력해주세요."
						value={values.password}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					className="py-2 px-4 bg-blue-500 text-white rounded-md"
					type="submit"
				>
					로그인
				</button>
				<Link
					className="py-2 px-4 text-center text-blue-500 border border-blue-500 rounded-md"
					to="/signup"
				>
					회원가입하러 가기
				</Link>
			</form>
		</div>
	);
};

export default Login;
