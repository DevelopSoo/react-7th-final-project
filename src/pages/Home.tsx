import { Link } from "react-router-dom";
import Feed from "../components/Feed";

export default function Home() {
	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">글 목록</h1>
				<Link to="/feeds/create" className="bg-blue-500 text-white px-4 py-2 rounded-md">
					글쓰기
				</Link>
			</div>
			<div className="flex flex-col gap-4 mb-10">
				<Feed />
				<Feed />
				<Feed />
				<Feed />
				<Feed />
			</div >
		</>
	);
}
