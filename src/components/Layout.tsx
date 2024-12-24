import { Link, Outlet } from "react-router-dom";
import supabase from "../utils/supabase.ts";

export default function Layout() {
	// TODO: 로그인 zustand로 변경
	const user = null
	const handleLogout = async () => {
		await supabase.auth.signOut();
	}
	return (
		<>
			<header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
				<div>
					<Link to="/">
						<img src="/logo.svg" alt="logo" />
					</Link>
				</div>
				{
					user ? (
						<div className="flex items-center gap-2">
							<Link to="/mypage" className="hover:underline">
								{user?.email}
							</Link>
							<button onClick={handleLogout} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
								로그아웃
							</button>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<Link to="/login" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
								로그인
							</Link>
							<Link to="/signup" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
								회원가입
							</Link>
						</div>
					)
				}
			</header>
			<Outlet />
		</>
	);
}

