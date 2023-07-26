import Avatar from '../Avatar';

import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useUser from '@/hooks/useUser';
import useFollowersModal from '@/hooks/useFollowersModal';
import useFollowingModal from '@/hooks/useFollowingModal';

interface UserCardProps {
	userId: string;
}

const UserCard: React.FC<UserCardProps> = ({ userId }) => {
	const router = useRouter();
	const { data: fetchedUser } = useUser(userId);

    const followersModal = useFollowersModal()
    const followingModal = useFollowingModal()

	const onClick = useCallback(
		(event: any) => {
			event.stopPropagation();

			const url = `/users/${userId}`;
			router.push(url);

            if(followersModal.isOpen) {
                followersModal.onClose()
            } else if(followingModal.isOpen) {
                followingModal.onClose()
            }
		},
		[userId, router, followersModal, followingModal],
	);

	return (
		<div
			onClick={onClick}
			className="mx-8 flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-neutral-800 p-4 hover:border-green-600 transition duration-200"
		>
			<div className="">
				<Avatar userId={userId} hasBorder />
			</div>
			<div className="flex cursor-default flex-col">
				<p className="text-sm font-semibold text-white">{fetchedUser?.name}</p>
				<p className="text-sm text-green-400">@{fetchedUser?.username}</p>
			</div>
		</div>
	);
};

export default UserCard;
