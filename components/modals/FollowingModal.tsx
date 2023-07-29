import { useRouter } from 'next/router';

import Modal from '../Modal';
import UserCard from '../users/UserCard';

import useUser from '@/hooks/useUser';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFollowingModal from '@/hooks/useFollowingModal';

const FollowingModal = ({}) => {
	const router = useRouter();

	const { userId } = router.query;
	const { data: fetchedUser } = useUser(userId as string);
	const { data: currentUser } = useCurrentUser();

	const followingModal = useFollowingModal();

	const bodyContent = (
		<div className="flex flex-col text-gray-400">
			<div className="mb-5 flex -space-x-4">
				{fetchedUser?.followerIds?.length === 0 ? (
					<div className="flex h-full items-center justify-center">
						{userId === currentUser?.id ? (
							<p>You are currently not following anyone.</p>
						) : (
							<p className="text-white text-center">
								@{fetchedUser?.username} is not following anyone.
							</p>
						)}
					</div>
				) : (
					fetchedUser?.followerIds
						?.slice(-4)
						.map((friendId: any) => (
							<UserCard key={friendId} userId={friendId} />
						))
				)}
			</div>
		</div>
	);
	return (
		<Modal
			title="Following"
			body={bodyContent}
			onClose={followingModal.onClose}
			isOpen={followingModal.isOpen}
			onSubmit={() => {}}
			actionLabel=""
		/>
	);
};

export default FollowingModal;
