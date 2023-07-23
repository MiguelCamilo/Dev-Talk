import Avatar from '../Avatar';

import { useRouter } from 'next/router';

interface FollowUserCardProps {
	userId: string;
	name: string;
	username: string;
}

const FollowUserCard: React.FC<FollowUserCardProps> = ({
	userId,
	name,
	username,
}) => {
	const router = useRouter();

	const onClick = (event: any) => {
		event.stopPropagation();

		const url = `/users/${userId}`;
		router.push(url);
	};

	return (
		<div className="flex flex-row">
			<Avatar userId={userId} hasBorder />
			<div className="flex cursor-default flex-col">
				<p
					onClick={onClick}
					className="text-sm font-semibold text-white hover:underline hover:decoration-2"
				>
					{name}
				</p>
				<p className="text-sm text-green-400">@{username}</p>
			</div>
		</div>
	);
};

export default FollowUserCard;
