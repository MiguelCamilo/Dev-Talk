import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';

import Image from 'next/image';
import { useCallback } from 'react';

interface AvatarProps {
	userId: string;
	isLarge?: boolean;
	hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
	const { data: fetchedUser } = useUser(userId);
	const router = useRouter();

	// this onClick will route the avatar to the correct profile page
	// for the clicked user
	const onClick = useCallback(
		(event: any) => {
			// this is used because the parent element that avatar is in is also a
			// clickable element and when the avatar is clicked
			// we want this onClick to overide the parent onClick event
			event.stopPropagation();

			const url = `/users/${userId}`;
			router.push(url);
		},
		[router, userId],
	);
	return (
		<div
			className={`
                ${hasBorder ? 'border-2 border-green-400' : ''} 
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                relative cursor-pointer rounded-full transition hover:opacity-90
            `}
		>
			<Image
				fill
				style={{
					objectFit: 'cover',
					borderRadius: '100%',
				}}
				alt="Avatar"
                onClick={onClick}
                src={fetchedUser?.profileImage || '/img/placeholder.png'}
			/>
		</div>
	);
};

export default Avatar;
