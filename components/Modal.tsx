import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Button from '@/components/Button';

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
}) => {
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		onClose();
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}
		onSubmit();
	}, [disabled, onSubmit]);

	if (!isOpen) return null;

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-auto bg-neutral-900 backdrop-blur-sm bg-opacity-70 outline-none focus:outline-none">
				{/* makes the modal responsive */}
				<div className="relative mx-auto my-6 h-full w-full lg:h-auto lg:w-3/6 lg:max-w-3xl">
					{/* content */}
					<div className="flex h-full w-full flex-col rounded-lg border-0 bg-black shadow-lg outline-none focus:outline-none lg:h-auto">
						{/* header */}
						<div className="flex items-center justify-between rounded-t p-10">
							<h3 className="text-3xl font-semibold text-white">{title}</h3>
							<button
								onClick={handleClose}
								className="ml-auto border-0 p-1 text-white transition  hover:opacity-70"
							>
								<AiOutlineClose size={28} className='hover:bg-neutral-700 hover:rounded-full p-1' />
							</button>
						</div>

						{/* body */}
						<div className="relative flex-auto px-10 py-2">{body}</div>
						{/* footer */}
						<div className="flex flex-col gap-2 px-5 mb-20">
							{actionLabel ? (
								<Button
								onClick={handleSubmit}
								disabled={disabled}
								label={actionLabel}
								secondary
								fullWidth
								large
							/>
							) : (
								null
							)
						}
							{footer}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
