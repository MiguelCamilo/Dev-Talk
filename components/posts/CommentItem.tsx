import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';

interface CommentItemProps {
	data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
	const router = useRouter();

	const goToUser = useCallback(
		(event: any) => {
			event.stopPropagation();

			router.push(`/users/${data.user.id}`);
		},
		[router, data.user.id],
	);

	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data.createdAt]);

	return (
		<div className="cursor-pointer border-b-[1px] border-neutral-800 p-5 transition hover:bg-neutral-800">
			<div className="flex flex-row items-start gap-3">
				<Avatar userId={data.user?.id} />
				<div>
					<div className="flex flex-row items-center gap-2">
						<p
							onClick={goToUser}
							className="cursor-pointer font-semibold text-white hover:underline"
						>
							{data.user?.name}
						</p>
						<span className="hidden cursor-pointer text-neutral-500 hover:text-green-500 md:block">
							@{data.user?.username}
						</span>
						<span className="text-sm text-neutral-500">{createdAt}</span>
					</div>
					<div className="max-w-2xl p-4">
						<p className="mt-1 break-all text-sm text-white whitespace-pre-line">{data?.body}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
