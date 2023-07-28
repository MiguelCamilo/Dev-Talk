import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';

import Avatar from '../Avatar';

import useFollow from '@/hooks/useFollow';

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
	const { isFollowing, toggleFollow } = useFollow(userId);

	const onClick = useCallback(
		(event: any) => {
			event.stopPropagation();

			const url = `/users/${userId}`;
			router.push(url);
		},
		[userId, router],
	);

	return (
		<div className="flex flex-row gap-2">
			<Avatar userId={userId} hasBorder />
			<div className="flex cursor-default flex-col">
				<p
					onClick={onClick}
					className="cursor-pointer text-sm font-semibold text-white hover:underline hover:decoration-2"
				>
					{name}
				</p>
				<p className="text-sm text-green-400">@{username}</p>
			</div>

			<div className="absolute lg:hidden xl:block">
				<button
					onClick={toggleFollow}
					className={`${
						!isFollowing
							? 'relative -right-[9rem] shrink rounded-lg border border-green-600 px-3 py-1 text-center text-green-400 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-green-300'
							: 'relative -right-[9rem] shrink rounded-lg border border-red-500 px-3 py-1 text-center text-red-400 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-red-600'
					}`}
				>
					{isFollowing ? (
						<span className="text-xs">Unfollow</span>
					) : (
						<span className="text-xs">Follow</span>
					)}
				</button>
			</div>

			{/* <Button
				onClick={toggleFollow}
				label=
				secondary={!isFollowing}
				outline={isFollowing}
			/> */}
		</div>
	);
};

export default FollowUserCard;
