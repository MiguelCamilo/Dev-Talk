import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import axios from 'axios';
import { toast } from 'react-hot-toast';

import {
	AiOutlineHeart,
	AiFillHeart,
	AiOutlineMessage,
	AiOutlineDelete,
	AiOutlineEye,
	AiOutlineEllipsis,
} from 'react-icons/ai';

import useLike from '@/hooks/useLike';
import usePost from '@/hooks/usePost';
import usePosts from '@/hooks/usePosts';
import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar';
import DropdownMenu from '../DropdownMenu';

interface PostItemProps {
	userId?: string;
	data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data = {} }) => {
	//! TODO: ADD EYE VIEW ICON, CHECK FOR EACH TIME POST HAS BEEN CLICKED

	const router = useRouter();

	const loginModal = useLoginModal();

	const { mutate: mutatedFetchedPost } = usePost(data.id);
	const { mutate: mutateFetchedPosts } = usePosts(userId);
	const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
	const { data: currentUser } = useCurrentUser();

	// const [view, setView] = useState(0); //! FIND OUT HOW WE CAN KEEP THIS IN THE DB

	const handleDeletePost = useCallback(async () => {
		try {
			await axios.delete(`/api/posts/${data.id}`);

			toast.success('Your post was deleted.', {
				duration: 3000,
				position: 'bottom-center',
				style: { background: '#16a34a', color: 'white', fontSize: 'small' },
			});

			// using .asPath.includes() allows us
			// to check if the string contains the postId
			if (router.asPath.includes(data.id)) {
				router.back();
			}

			mutatedFetchedPost();
			mutateFetchedPosts();
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong.');
		}
	}, [router, data.id, mutateFetchedPosts, mutatedFetchedPost]);

	const goToUser = useCallback(
		(event: any) => {
			event.stopPropagation();

			router.push(`/users/${data.user?.id}`);
		},
		[router, data.user?.id],
	);

	const goToPost = useCallback(
		(event: any) => {
			event.stopPropagation();

			router.push(`/posts/${data.id}`);
		},
		[router, data.id],
	);

	const onLike = useCallback(
		(event: any) => {
			event.stopPropagation();
			if (!currentUser) {
				return loginModal.onOpen();
			}

			toggleLike();
		},
		[loginModal, currentUser, toggleLike],
	);

	const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data?.createdAt]);

	const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
	return (
		<div
			onClick={goToPost}
			className="cursor-pointer border-l border-green-600 p-4 transition hover:bg-neutral-800"
		>
			{/* only render the delete if user created post */}
			{currentUser?.id === data?.userId && (
				<div className="flex w-full justify-end">
					<DropdownMenu
						label="Delete"
						onClick={handleDeletePost}
						buttonIcon={AiOutlineDelete}
						dropDownIcon={AiOutlineEllipsis}
						dropDownClassName="text-white hover:text-neutral-300"
						className="text-red-600"
						btnClassName="flex flex-row gap-1 text-red-600"
					/>
				</div>
			)}
			<div className="flex flex-row items-start gap-3">
				<Avatar userId={data.user?.id} />
				<div>
					<div onClick={goToUser} className="flex flex-row items-center gap-2">
						<p className="cursor-pointer font-semibold text-white hover:underline">
							{data.user.name}
						</p>
						<span
							onClick={goToUser}
							className="hidden cursor-pointer text-sm text-neutral-500 hover:text-green-600 md:block"
						>
							@{data.user?.username}
						</span>

						<span className="text-xs text-neutral-500">{createdAt} ago</span>
					</div>

					<div className="max-w-2xl">
						<p className="mt-1 whitespace-pre-line break-all text-sm text-white">
							{data.body}
						</p>
					</div>

					<div className="mt-3 flex flex-row items-center gap-10">
						<div className="flex cursor-pointer flex-row items-center gap-1 text-neutral-500 transition hover:text-green-400">
							<AiOutlineMessage
								size={36}
								className="rounded-full p-2 hover:bg-green-800 hover:bg-opacity-30"
							/>
							<p>{data.comments?.length || 0}</p>
						</div>

						<div
							onClick={onLike}
							className="flex cursor-pointer flex-row items-center gap-1 text-neutral-500 transition hover:text-rose-600"
						>
							<LikeIcon
								size={36}
								className={`${
									hasLiked
										? 'rounded-full p-2 text-rose-600 hover:bg-rose-800 hover:bg-opacity-30'
										: 'rounded-full p-2 hover:bg-rose-800 hover:bg-opacity-30'
								}`}
							/>
							<p className={`${hasLiked && 'text-rose-600'}`}>
								{data.likedIds?.length || 0}
							</p>
						</div>

						{/* view count */}
						{/* <div className='flex flex-row gap-2'>
							<AiOutlineEye size={26} className="text-neutral-600" />
							<span className="text-neutral-700">{view}</span>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostItem;
