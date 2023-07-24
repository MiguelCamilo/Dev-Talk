import FollowUserCard from './FollowUserCard';

import useUsers from '@/hooks/useUsers';
import useCurrentUser from '@/hooks/useCurrentUser';

const Followbar = () => {
	// get all users and store in an emtpy array from users hook
	const { data: users = [] } = useUsers();
	const { data: currentUser } = useCurrentUser()

	// filter out currentUser from the list
	const filteredUsers = users.filter((user: { id: any; }) => user.id !== currentUser?.id )

	if (users.length === 0) {
		return null;
	}


	return (
		<div className="hidden px-6 py-4 lg:block">
			<div className="rounded-xl bg-neutral-800 p-4">
				<h2 className="text-xl font-semibold text-white">Who to follow</h2>
				<div className="mt-4 flex flex-col gap-6">
					{/* MAP THROUGH USER LIST */}
					{filteredUsers.map((user: Record<string, any>) => (
						<FollowUserCard 
							key={user.id}
							userId={user.id}
							name={user.name}
							username={user.username}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Followbar;
