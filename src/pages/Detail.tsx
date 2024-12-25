import { FaCommentDots, FaAngleUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";

export default function Detail() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<Link to="/" className="text-sm flex gap-2 p-2">
					<span className="text-blue-900 font-bold">{`<`}</span>
					<span className="text-gray-600">뒤로가기</span>
				</Link>
				<div className="flex gap-2.5">
					<Link to={`/feeds/update/1`} className="bg-yellow-500 text-white px-4 py-2 rounded-md">
						수정
					</Link>
					<button className="bg-red-500 text-white px-4 py-2 rounded-md">
						삭제
					</button>
				</div>
			</div>
			<div className="bg-white p-6 flex justify-between rounded-lg">
				<div>
					<button className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950">
						<FaAngleUp className="text-xs text-center font-bold" />
						<div className="font-bold">12</div>
					</button>
				</div>

				<div className="flex-1 px-10 min-w-0 flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-gray-900 text-xl font-bold">제목입니다.</h2>
						<p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque impedit tenetur itaque vero dolore. Voluptatem voluptatibus recusandae sed maiores tenetur commodi, itaque fuga animi, eum magni nemo qui! Saepe, perspiciatis!</p>
					</div>
					<p className="text-xs text-right text-gray-600">
						작성일: {new Date().toLocaleDateString()}
					</p>
				</div>

				<div className="flex items-center gap-1 p-3">
					<FaCommentDots className="text-gray-500 font-bold text-xl " />
					<div className="text-blue-950 font-bold text-sm" >
						12
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-8 bg-white p-6 rounded-lg">
				<h3 className="text-blue-950 font-semibold">12 Comments</h3>
				<Comment />
				<Comment />
			</div>

			<CommentForm />
		</div>
	)
}
