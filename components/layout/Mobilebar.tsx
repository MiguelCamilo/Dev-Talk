import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarItem from '@/components/layout/SidebarItem';

import { FaUser } from 'react-icons/fa';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';

const MobileBar = () => {
	const { data: currentUser } = useCurrentUser();

    const items = [
		{
			label: 'Home',
			href: '/',
			icons: BsHouseFill,
		},
		{
			label: 'Notifications',
			href: '/notifications',
			icons: BsBellFill,
			auth: true,
			alert: currentUser?.hasNotification,
		},
		{
			label: 'Profile',
			href: `/users/${currentUser?.id}`,
			icons: FaUser,
			auth: true,
		},
	];

	return (
		<div className="sticky bottom-0 left-0 z-40 h-16 w-full border-t border-gray-800 bg-[#16181c] lg:hidden">
			<div className="flex flex-row justify-between mx-6">
            {items.map((item) => (
						<SidebarItem
							key={item.href}
							href={item.href}
							label={item.label}
							icon={item.icons}
							auth={item.auth}
							alert={item.alert}
						/>
					))}
			</div>
		</div>
	);
};

export default MobileBar;
