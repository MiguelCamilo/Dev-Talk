import useUser from '@/hooks/useUser';
import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal'
import useLoginModal from '@/hooks/useLoginModal';

import Button from '../Button';

import { format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import { BiCalendar } from 'react-icons/bi';

interface UserBioProps {
	userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
	const { data: fetchedUser } = useUser(userId);
	const { data: currentUser } = useCurrentUser();

	const editModal = useEditModal()
	const loginModal = useLoginModal()

	const handleEditClick = useCallback(() => {
		if(!currentUser) {
			loginModal.onOpen()
		}

		editModal.onOpen()

	}, [editModal, loginModal, currentUser])

	// useMemo will run only if the dependencies has changed
	const createdAt = useMemo(() => {
		if (!fetchedUser?.createdAt) {
			return null;
		}

		return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
	}, [fetchedUser?.createdAt]);

	return (
		<div className="border-b-[1px] border-neutral-800 pb-4">
			<div className="flex justify-end p-2">
				{currentUser?.id === userId ? (
					<Button secondary label="Edit" onClick={handleEditClick} />
				) : (
					<Button onClick={() => {}} label="Follow" secondary />
				)}
			</div>
			<div className="mt-8 px-4">
				<div className="flex flex-col">
					<p className="text-2xl font-semibold text-white">
						{fetchedUser?.name}
					</p>
					<p className="text-md text-green-600">@{fetchedUser?.username}</p>
				</div>

				<div className="mt-4 flex flex-col">
					<p className="text-white">{fetchedUser?.bio}</p>
					<div className="mt-4 flex flex-row items-center gap-1 text-neutral-500">
						<BiCalendar size={20} />
						<p className="text-sm text-neutral-500">
							<span className="font-bold">Member Since:</span>{' '}
							<span className="italic">{createdAt}</span>
						</p>
					</div>
				</div>

                <div className='flex flex-row items-center mt-4 gap-6'>
                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {fetchedUser?.followingIds.length}                            
                        </p>
                        <p className='text-neutral-500'>Following</p>
                    </div>

                    <div className='flex flex-row items-center gap-1'>
                        <p className='text-white'>
                            {fetchedUser?.followersCount || 0}                            
                        </p>
                        <p className='text-neutral-500'>Followers</p>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default UserBio;
