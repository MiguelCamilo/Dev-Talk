import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { BiArrowBack } from 'react-icons/bi';

interface HeaderProps {
	noSticky?: boolean
	label: string;
	showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow, noSticky }) => {
	const router = useRouter();

	const handleBack = useCallback(() => {
		router.back();
	}, [router]);

	return (
		<div
			className={`${
				noSticky
					? 'border-b-[1px] border-neutral-800 bg-[#16181c] p-5'
					: 'sticky left-0 top-0 z-40 border-b-[1px] border-neutral-800 bg-[#16181c] p-5'
			}`}
		>
			<div className="flex flex-row items-center gap-2">
				{showBackArrow && (
					<BiArrowBack
						onClick={handleBack}
						size={20}
						color="white"
						className="cursor-pointer transition hover:opacity-70"
					/>
				)}
				<h1 className="text-xl font-semibold text-white">{label}</h1>
			</div>
		</div>
	);
};

export default Header;
