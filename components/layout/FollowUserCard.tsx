import { useCallback } from 'react';
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
	
	const onClick = useCallback((event: any) => {
		event.stopPropagation();
		
		const url = `/users/${userId}`;
		router.push(url);
		
	}, [userId, router])

	return (
		<div className="flex flex-row gap-2">
			<Avatar userId={userId} hasBorder />
			<div className="flex cursor-default flex-col">
				<p
					onClick={onClick}
					className="text-sm font-semibold text-white hover:underline hover:decoration-2 cursor-pointer"
				>
					{name}
				</p>
				<p className="text-sm text-green-400">@{username}</p>
			</div>
		</div>
	);
};

export default FollowUserCard;
