import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import Modal from '../Modal';

const SidebarPostButton = () => {
	const router = useRouter()
	
	const { data: currentUser } = useCurrentUser();
	const loginModal = useLoginModal();

	//! TODO: ADD FORM POST MODAL 
	const onClick = useCallback(() => {
		if(!currentUser) {
			return loginModal.onOpen();
		}

		router.push('/')
	}, [loginModal, currentUser, router]);

	return (
		<div onClick={onClick}>
			<div className="ml-3 mt-6 flex p-3 cursor-pointer items-center justify-center rounded-full bg-green-500 transition hover:bg-opacity-80 lg:hidden">
				<FaEdit color="white" size={20} />
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
 