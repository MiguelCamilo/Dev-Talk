import SidebarLogo from '@/components/layout/SidebarLogo';
import SidebarItem from '@/components/layout/SidebarItem';
import SidebarPostButton from './SidebarPostButton';

import { FaUser } from 'react-icons/fa';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {
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
		},
		{
			label: 'Profile',
			href: '/users/123',
			icons: FaUser,
		},
	];
	return (
		<div className="col-span-1 h-full pr-4 md:pr-6">
			<div className="flex flex-col items-end">
				<div className="space-y-2 lg:w-[230px] relative">
					<SidebarLogo />
          {/* <h1 className='text-white absolute top-2 left-20 hidden lg:block'>Dev-Talk</h1> */}
					{items.map((item) => (
						<SidebarItem
							key={item.href}
							href={item.href}
							label={item.label}
							icon={item.icons}
						/>
					))}
					<SidebarItem onClick={() => {}} icon={BiLogOut} label="LogOut" />
					<SidebarPostButton />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
