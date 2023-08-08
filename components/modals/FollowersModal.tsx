import { useRouter } from 'next/router';

import Modal from '../Modal';
import UserCard from '../users/UserCard';

import useUser from '@/hooks/useUser';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFollowersModal from '@/hooks/useFollowersModal';

const FollowersModal = ({}) => {
	const router = useRouter();

	const { userId } = router.query;
	const { data: fetchedUser } = useUser(userId as string);
	const { data: currentUser } = useCurrentUser();

	const followersModal = useFollowersModal();

	const bodyContent = (
		<div className="flex flex-col text-gray-400">
			<div className="grid-col-3 grid h-[35rem] gap-3 overflow-y-auto lg:h-[20rem]">
				{fetchedUser?.followerIds?.length === 0 ? (
					<div className="flex h-full items-center justify-center">
						{userId === currentUser?.id ? (
							<p>You currently have no followers.</p>
						) : (
							<p className="tex-white text-center">
								@{fetchedUser?.username} currently has no followers.
							</p>
						)}
					</div>
				) : (
					fetchedUser?.followerIds?.map((friendId: any) => (
						<UserCard key={friendId} userId={friendId} />
					))
				)}
			</div>
		</div>
	);
	return (
		<Modal
			title="Followers"
			body={bodyContent}
			onClose={followersModal.onClose}
			isOpen={followersModal.isOpen}
			onSubmit={() => {}}
			actionLabel=""
		/>
	);
};

export default FollowersModal;
