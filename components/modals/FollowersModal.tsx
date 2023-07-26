import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import Modal from '../Modal';
import UserCard from '../users/UserCard';

import useUser from '@/hooks/useUser';
import useFollowersModal from '@/hooks/useFollowersModal';

const FollowersModal = ({}) => {
	const router = useRouter();
	const { userId } = router.query;
	const { data: fetchedUser } = useUser(userId as string);
	const followersModal = useFollowersModal();


	const bodyContent = (
		<div className="flex flex-col text-gray-400">
			<div className="mb-5 flex -space-x-4">
				{fetchedUser?.followerIds?.length === 0 ? (
					<div className="flex h-full items-center justify-center">
						<p className='text-center tex-white'>No Followers</p>
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
