import { useCallback, useMemo } from 'react';

import { toast } from 'react-hot-toast';
import axios from 'axios';

import useUser from './useUser';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';

const useFollow = (userId: string) => {
	const { mutate: mutateFetchedUser } = useUser(userId);
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	
	const loginModal = useLoginModal();

	const isFollowing = useMemo(() => {
		const list = currentUser?.followingIds || [];

		return list.includes(userId);
	}, [userId, currentUser?.followingIds]);


	const toggleFollow = useCallback(async () => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		try {
			let request;

			if (isFollowing) {
				request = () =>
					axios.delete(`/api/follow`, {
						data: {
							userId,
						},
					});
			} else {
				request = () => axios.post(`/api/follow`, { userId });
			}

			await request();
			mutateCurrentUser();
			mutateFetchedUser();

			toast.success('Success');
		} catch (error) {
			console.log(error);
			toast.error('Unable to follow user, try again');
		}
	}, [
		currentUser,
		loginModal,
		isFollowing,
		userId,
		mutateCurrentUser,
		mutateFetchedUser,
	]);

    return { isFollowing, toggleFollow }
};

export default useFollow;
