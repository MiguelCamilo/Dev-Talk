import { useRouter } from 'next/router';

import { FaSeedling } from 'react-icons/fa';

const SidebarLogo = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => router.push('/')}
			className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full p-4 transition hover:bg-neutral-900"
		>
			
			<FaSeedling size={28} className="text-green-400 hover:text-green-500" />
		</div>
	);
};

export default SidebarLogo;
