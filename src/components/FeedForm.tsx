export default function FeedForm({
	pageTitle,
	title = "",
	content = "",
	children,
}: {
	pageTitle: string;
	title?: string;
	content?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
			<form className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="title" className="text-lg font-bold text-gray-800">
						제목
					</label>
					<input
						type="text"
						id="title"
						placeholder="제목"
						value={title}
						className="p-3 rounded-lg border border-gray-300"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="content" className="text-lg font-bold text-gray-800">
						내용
					</label>
					<textarea
						id="content"
						placeholder="내용"
						value={content}
						className="p-3 rounded-lg border border-gray-300 h-[400px] resize-none"
					/>
				</div>
				{children}
			</form>
		</div>
	)
}