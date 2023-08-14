import useUser from '@/hooks/useUser';
import useFollow from '@/hooks/useFollow';
import useCurrentUser from '@/hooks/useCurrentUser';

import useEditModal from '@/hooks/useEditModal';
import useFollowersModal from '@/hooks/useFollowersModal';
import useFollowingModal from '@/hooks/useFollowingModal';

import Button from '../Button';
import DropdownMenu from '../DropdownMenu';

import { format } from 'date-fns';
import { useMemo } from 'react';
import { signOut } from 'next-auth/react';
import { BiCalendar, BiLogOut } from 'react-icons/bi';
import { AiOutlineEllipsis } from 'react-icons/ai';

interface UserBioProps {
	userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
	const { data: fetchedUser } = useUser(userId);
	const { data: currentUser } = useCurrentUser();

	const editModal = useEditModal();
	const followersModal = useFollowersModal();
	const followingModal = useFollowingModal();

	const { isFollowing, toggleFollow } = useFollow(userId);

	// useMemo will run only if the dependencies has changed
	const createdAt = useMemo(() => {
		if (!fetchedUser?.createdAt) {
			return null;
		}

		return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
	}, [fetchedUser?.createdAt]);

	return (
		<div className="relative border-b-[1px] border-neutral-800 pb-4">
			{/* mobile logout button */}
			{currentUser && (
				<div className="absolute -top-[14rem] right-5 z-40 flex flex-row-reverse gap-1 lg:hidden">
					<DropdownMenu
						label="Log out"
						onClick={signOut}
						buttonIcon={BiLogOut}
						dropDownIcon={AiOutlineEllipsis}
						dropDownClassName="text-white hover:text-neutral-300"
						className="text-red-600"
						btnClassName="flex flex-row gap-1 text-red-600"
					/>
				</div>
			)}

			<div className="flex justify-end p-2">
				{currentUser?.id === userId ? (
					<Button secondary label="Edit" onClick={editModal.onOpen} />
				) : (
					<Button
						onClick={toggleFollow}
						label={isFollowing ? 'Unfollow' : 'Follow'}
						secondary={!isFollowing}
						outline={isFollowing}
					/>
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

				<div className="mt-4 flex flex-row items-center gap-6">
					<div
						onClick={followingModal.onOpen}
						className="flex cursor-pointer flex-row items-center gap-1"
					>
						<p className="text-white hover:text-green-400">
							{fetchedUser?.followingIds.length}
						</p>
						<p className="text-neutral-500 hover:text-green-400">Following</p>
					</div>

					<div
						onClick={followersModal.onOpen}
						className="flex cursor-pointer flex-row items-center gap-1"
					>
						<p className="text-white hover:text-green-400">
							{fetchedUser?.followersCount || 0}
						</p>
						<p className="text-neutral-500 hover:text-green-400">Followers</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserBio;
