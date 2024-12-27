import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase.ts";

const Signup = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({
		nickname: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// 이메일 형식 검증 추가
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(values.email)) {
			return alert("올바른 이메일 형식이 아닙니다.");
		}

		if (values.password.length < 8) {
			return alert("비밀번호는 8자 이상이어야 합니다.");
		}
		if (values.password !== values.passwordConfirm) {
			return alert("비밀번호가 일치하지 않습니다.");
		}

		try {
			// 회원가입 시도
			const { error: signUpError, data } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
				options: {
					data: {
						nickname: values.nickname,
					},
				},
			});

			if (signUpError) {
				if (signUpError.message === "User already registered") {
					return alert("이미 가입된 이메일입니다.");
				}
				throw signUpError;
			}

			// users 테이블에 데이터 삽입
			const { error: userInsertError } = await supabase.from("users").insert({
				email: values.email,
				nickname: values.nickname,
				id: data.user?.id, // auth의 user id를 저장
			});

			if (userInsertError) {
				// users 테이블 삽입 실패 시 회원가입 롤백 처리 필요
				// -> trigger 사용이 필요할 예정
				throw userInsertError;
			}

			navigate("/");
		} catch (error: unknown) {
			return alert(`회원가입에 실패했습니다. ${error}`);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">회원가입</h1>
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
						htmlFor="nickname"
						className="text-sm">
						닉네임
					</label>
					<input
						className="border border-gray-300 rounded-md p-2"
						id="nickname"
						name="nickname"
						type="text"
						placeholder="닉네임을 입력해주세요."
						value={values.nickname}
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
				<div className="flex flex-col gap-2">
					<label
						htmlFor="passwordConfirm"
						className="text-sm">
						비밀번호 확인
					</label>
					<input
						id="passwordConfirm"
						name="passwordConfirm"
						type="password"
						className="border border-gray-300 rounded-md p-2"
						placeholder="비밀번호를 한 번 더 입력해주세요."
						value={values.passwordConfirm}
						onChange={handleChange}
						required
					/>
				</div>
				<button
					className="py-2 px-4 bg-blue-500 text-white rounded-md"
					type="submit"
				>
					회원가입
				</button>
				<Link
					className="py-2 px-4 text-center text-blue-500 border border-blue-500 rounded-md"
					to="/login"
				>
					로그인하러 가기
				</Link>
			</form>
		</div>
	);
};

export default Signup;
