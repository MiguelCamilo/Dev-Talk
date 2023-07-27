import { useCallback, useMemo } from 'react';

import { toast } from 'react-hot-toast';

import usePost from './usePost';
import usePosts from './usePosts';
import useCurrentUser from './useCurrentUser';
import useLoginModal from './useLoginModal';
import axios from 'axios';

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedPost, mutate: mutatedFetchedPost } = usePost(postId);
	const { mutate: mutateFetchedPosts } = usePosts(userId);

	const loginModal = useLoginModal();

	// check if the currentUser has liked a post
	const hasLiked = useMemo(() => {
		const list = fetchedPost?.likedIds || [];

		return list.includes(currentUser?.id);
	}, [fetchedPost, currentUser?.id]);

	const toggleLike = useCallback(async () => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		try {
			let request;
			if (hasLiked) {
				request = () =>
					axios.delete('/api/like', {
						data: {
							postId,
						},
					});
			} else {
				request = () => axios.post('/api/like', { postId });
			}

			await request();
            mutatedFetchedPost() //single post
            mutateFetchedPosts() // all posts

		} catch (error) {
			toast.error('Something went wrong.');
		}
	}, [currentUser, loginModal, postId, hasLiked, mutatedFetchedPost, mutateFetchedPosts]);

    return { hasLiked, toggleLike }
};


export default useLike;

/*
Here's why this is better:
    It separates the destructured params from the type declaration, making it clearer.
    The type is reusable you can declare other hooks with the same type.
    It allows marking the userld as optional with ?.
    The param names and types are explicit rather than inferred.
*/
