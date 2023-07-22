import useUsers from '@/hooks/useUsers';

const Followbar = () => {
	const { data: users = [] } = useUsers()

	if(users.length === 0){
		return null
	}


	return (
		<div className="hidden px-6 py-4 lg:block">
			<div className="bg-neutral-800 rounded-xl p-4">
				<h2 className="text-xl font-semibold text-white">Who to follow</h2>
				<div className="mt-4 flex flex-col gap-6">
					{/* MAP THROUGH USER LIST */}
					
				</div>
			</div>
		</div>
	);
};

export default Followbar;
