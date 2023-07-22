import useUsers from '@/hooks/useUsers';
import Avatar from '../Avatar';

const Followbar = () => {
	// get all users and store in an emtpy array from users hook
	const { data: users = [] } = useUsers();

	if (users.length === 0) {
		return null;
	}

	return (
		<div className="hidden px-6 py-4 lg:block">
			<div className="rounded-xl bg-neutral-800 p-4">
				<h2 className="text-xl font-semibold text-white">Who to follow</h2>
				<div className="mt-4 flex flex-col gap-6">
					{/* MAP THROUGH USER LIST */}
					{users.map((user: Record<string, any>) => (
						<p className="flex flex-row gap-4" key={user.id}>
							<Avatar userId={user.id} hasBorder />
							<div className="flex cursor-default flex-col">
								<p className="text-sm font-semibold text-white hover:underline hover:decoration-2">
									{user.name}
								</p>
								<p className="text-sm text-green-400">@ {user.username}</p>
							</div>
						</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default Followbar;
