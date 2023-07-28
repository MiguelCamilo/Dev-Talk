import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

import { BsDot } from 'react-icons/bs';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';

interface SidebarItemProps {
	label: string;
	href?: string;
	auth?: boolean;
	alert?: boolean;
	icon: IconType;
	onClick?: () => void;
}

// icon: Icon is an alias
const SidebarItem: React.FC<SidebarItemProps> = ({
	label,
	href,
	auth,
	alert,
	icon: Icon,
	onClick,
}) => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const { data: currentUser } = useCurrentUser();

	// this handles the sidebar navigation items
	// each item has an href that is passed down to the sidebar item comp
	const handleClick = useCallback(() => {
		if (onClick) {
			return onClick();
		}

		// if route is protected and !currentUser then openModal
		if (auth && !currentUser) {
			loginModal.onOpen();
		} else if (href) {
			router.push(href);
		}
	}, [onClick, href, router, currentUser, auth, loginModal]);

	return (
		<div onClick={handleClick} className="flex flex-row items-center">
			{/* mobile first */}
			<div className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-800 lg:hidden">
				<Icon size={28} className="text-slate-200 hover:text-slate-300" />
				{alert && (
					<>
						<BsDot
							className="absolute -top-4 left-0 animate-ping text-red-600"
							size={70}
						/>
						<BsDot className="absolute -top-4 left-0 text-red-600" size={70} />
					</>
				)}
			</div>

			{/* desktop first */}
			<div className="relative hidden cursor-pointer items-center gap-4 rounded-full p-4 hover:bg-neutral-800 lg:flex">
				<Icon size={24} className="text-slate-200 hover:text-slate-300" />
				<p className="text-gl hidden text-white lg:block">{label}</p>
				{alert && (
					<>
						<BsDot
							className="absolute -top-4 left-0 animate-ping text-red-600"
							size={70}
						/>
						<BsDot className="absolute -top-4 left-0 text-red-600" size={70} />
					</>
				)}
			</div>
		</div>
	);
};

export default SidebarItem;
