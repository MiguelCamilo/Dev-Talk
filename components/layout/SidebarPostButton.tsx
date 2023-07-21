import { useCallback } from 'react';
import { FaComment } from 'react-icons/fa';

import useLoginModal from '@/hooks/useLoginModal';

const SidebarPostButton = () => {
	const loginModal = useLoginModal();

	const onClick = useCallback(() => {
		loginModal.onOpen();
	}, [loginModal]);

	return (
		<div onClick={onClick}>
			<div className="ml-2 mt-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-500 transition hover:bg-opacity-80 lg:hidden">
				<FaComment color="white" />
			</div>

			{/* desktop view */}
			<div className="mt-6 hidden cursor-pointer items-center justify-center rounded-full bg-green-500 px-4 py-2 transition hover:bg-opacity-80 lg:block">
				<p className="hidden text-center font-semibold text-white lg:block">
					Post
				</p>
			</div>
		</div>
	);
};

export default SidebarPostButton;
