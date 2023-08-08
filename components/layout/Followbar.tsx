import { useState } from 'react';

import FollowUserCard from './FollowUserCard';

import useUsers from '@/hooks/useUsers';
import useCurrentUser from '@/hooks/useCurrentUser';

import { Pagination } from 'antd';

const Followbar = () => {
	const [current, setCurrent] = useState(1)
	// get all users and store in an emtpy array from users hook
	const { data: users = [] } = useUsers();
	const { data: currentUser } = useCurrentUser()

	//! TODO: REMOVE USER THAT THE CURRENT USER IS FOLLOWING 
	// filter out currentUser from the list
	const filteredUsers = users.filter((user: { id: any; }) => user.id !== currentUser?.id)

	const pageSize = 4

	// Calculate page offset
	const offset = (current - 1) * pageSize

	// Slice filtered users array for current page
	const currentPageUsers = filteredUsers.slice(offset, offset + pageSize);

	if (users.length === 0) {
		return null;
	}

	return (
		<div className="hidden px-8 py-4 lg:block">
			<div className="rounded-xl bg-neutral-800 p-6">
				<h2 className="text-xl font-semibold text-white">Who to follow</h2>
				<div className="mt-4 flex flex-col gap-6">
					{/* MAP THROUGH USER LIST */}
					{currentPageUsers.map((user: Record<string, any>) => (
						<FollowUserCard 
							key={user.id}
							userId={user.id}
							name={user.name}
							username={user.username}
						/>
					))}

					<Pagination
						current={current}
						total={filteredUsers.length}
						onChange={(page) => setCurrent(page)}
						pageSize={pageSize}
						style={{ color: '#16a34a', backgroundColor: 'white', padding: '6px', borderRadius: '10px' }}
						className='flex justify-center'
						responsive
					/>
				</div>
			</div>
		</div>
	);
};

export default Followbar;
