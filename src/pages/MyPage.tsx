import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import supabase from "../utils/supabase";

export default function MyPage() {
	const { user, setUser } = useAuthStore();
	const [nickname, setNickname] = useState("");
	const [profileFile, setProfileFile] = useState<File | null>(null);
	const [profileImage, setProfileImage] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		if (user) {
			setNickname(user.nickname || "");
			setProfileImage(user.img_url || "");
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(e.target.value);
	};

	const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setProfileFile(file);
			setProfileImage(URL.createObjectURL(file));
		}
	};

	// 1. profileFile이 있는 경우 스토리지에 업로드 
	// 2. 업로드 후 
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setIsUploading(true);
		e.preventDefault();
		if (!user) {
			return alert("로그인 후 이용해주세요.");
		}

		// 기본 업데이트 데이터
		const updateData = {
			nickname: nickname,
			img_url: "" // 기본값으로 빈 문자열 설정
		};

		try {
			if (profileFile) {
				// 파일 확장자 추출
				const fileExt = profileFile.name.split('.').pop();
				// 사용자 ID와 확장자를 조합하여 고유한 경로 생성
				const timestamp = new Date().getTime();
				const filePath = `${user.id}/profile.${timestamp}.${fileExt}`;
				const { error } = await supabase.storage
					.from('profiles')
					.upload(filePath, profileFile, {
						cacheControl: '3600',
						upsert: true,
					});

				if (error) {
					throw new Error(error.message);
				}
				const { data: { publicUrl } } = supabase.storage
					.from('profiles')
					.getPublicUrl(filePath);

				updateData.img_url = publicUrl;
			}


			const { data, error } = await supabase.from("users").update(updateData).eq("id", user.id).select()
			await supabase.auth.updateUser({
				data: updateData
			})

			if (error) {
				throw new Error(error.message);
			}

			setNickname(data[0].nickname);
			setProfileImage(data[0].img_url);
			setUser({ ...user, nickname: data[0].nickname, img_url: data[0].img_url });
		} catch (error: unknown) {
			if (error instanceof Error || 'message' in (error as object)) {
				return alert(`사용자 정보 업데이트에 실패했습니다. ${(error as { message: string }).message}`);
			}
			return alert('알 수 없는 에러가 발생했습니다.');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto p-6">
			<h1 className="text-2xl font-bold mb-8">마이페이지</h1>

			<div className="space-y-6">
				{/* 프로필 이미지 섹션 */}
				<div className="flex items-center space-x-4">
					<div className="relative">
						<img
							src={profileImage || "/default-profile.jpg"}
							alt="프로필 이미지"
							className="w-24 h-24 rounded-full object-cover"
						/>
						<input
							type="file"
							id="profileImage"
							accept="image/*"
							className="hidden"
							onChange={handleProfileImageChange}
						/>
						<label
							htmlFor="profileImage"
							className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 cursor-pointer"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</label>
					</div>
				</div>

				{/* 사용자 정보 폼 */}
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							이메일
						</label>
						<input
							type="email"
							id="email"
							value={user?.email}
							disabled
							className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm bg-gray-300 text-gray-500 cursor-not-allowed"
						/>
					</div>

					<div>
						<label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
							닉네임
						</label>
						<input
							type="text"
							id="nickname"
							value={nickname}
							onChange={handleChange}
							placeholder="닉네임을 입력하세요"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							disabled={isUploading}
							className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							{isUploading ? "업로드 중..." : "저장하기"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}