import { useRouter } from 'next/router';

import Modal from '../Modal';
import Avatar from '../Avatar';

import useUser from '@/hooks/useUser';
import useFollowersModal from '@/hooks/useFollowersModal';

const FollowersModal = ({  }) => {
    const router = useRouter()
    const { userId } = router.query
    const { data: fetchedUser } = useUser(userId as string)
    const followersModal = useFollowersModal()

	const bodyContent = (
		<div className="flex flex-col text-gray-400">
			<div className="mb-5 flex -space-x-4">
				{fetchedUser?.followingIds
					?.slice(-4)
					.map((friendId: any) => (
						<Avatar key={friendId} userId={friendId} hasBorder />
					))}
			</div>
		</div>
	);
	return (
        <Modal 
            title="Followers" 
            body={bodyContent} 
            onClose={followersModal.onClose}
            isOpen={followersModal.isOpen}
            actionLabel=''
            onSubmit={() => {}}
        />
    )
};

export default FollowersModal;
