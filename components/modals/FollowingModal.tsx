import { useRouter } from 'next/router';

import Modal from '../Modal';
import Avatar from '../Avatar';

import useUser from '@/hooks/useUser';
import useFollowingModal from '@/hooks/useFollowingModal';

const FollowingModal = ({  }) => {
    const router = useRouter()
    const { userId } = router.query
    const { data: fetchedUser } = useUser(userId as string)
    const followingModal = useFollowingModal()

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
            title="Following" 
            body={bodyContent} 
            onClose={followingModal.onClose}
            isOpen={followingModal.isOpen}
            onSubmit={() => {}}
            actionLabel=''
        />
    )
};

export default FollowingModal;
