import { useRouter } from 'next/router';
import { FaComment } from 'react-icons/fa';

const SidebarPostButton = () => {
	const router = useRouter();
	return (
		<div onClick={() => router.push('/')}>
			<div className="ml-2 mt-6 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-400 transition hover:bg-opacity-80 lg:hidden">
				<FaComment color="white" />
			</div>

            {/* desktop view */}
			<div className="mt-6 hidden px-4 py-2 cursor-pointer items-center justify-center rounded-full bg-green-400 transition hover:bg-opacity-80 lg:block">
				<p className='text-center hidden lg:block font-semibold text-white'>Post</p>
			</div>
		</div>
	);
};

export default SidebarPostButton;
