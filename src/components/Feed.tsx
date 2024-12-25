import { Link } from "react-router-dom";
import { FaAngleUp, FaCommentDots } from "react-icons/fa";

export default function Feed() {
	return (
		<Link
			className="flex justify-between bg-white shadow-md p-6 rounded-lg"
			to={`/feeds/1`}
		>
			<div>
				<button className="p-3 bg-gray-100 rounded-lg text-sm flex flex-col items-center gap-1 text-blue-950">
					<FaAngleUp className="text-xs text-center font-bold" />
					<div className="font-bold">12</div>
				</button>
			</div>
			<div className="flex-1 px-10 min-w-0 flex flex-col gap-4">
				<div className="flex flex-col">
					<h2 className="text-gray-900 text-lg font-bold">제목입니다.</h2>
					<p className="text-gray-600 truncate text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque impedit tenetur itaque vero dolore. Voluptatem voluptatibus recusandae sed maiores tenetur commodi, itaque fuga animi, eum magni nemo qui! Saepe, perspiciatis!</p>
				</div>
				<p className="text-right text-xs text-gray-600">
					작성일: {new Date().toLocaleDateString()}
				</p>
			</div >

			<div className="flex items-center gap-1 p-3 text-gray-600">
				<FaCommentDots className="text-gray-500 font-bold text-xl" />
				<div className="text-blue-950 font-bold text-sm">
					12
				</div>
			</div>
		</Link>
	)
}
