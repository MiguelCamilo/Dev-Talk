import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useCallback, useState } from 'react';

import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);
			//TODO: register & login

			registerModal.onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [registerModal]);

	const onToggle = useCallback(() => {
		// if user clicks register this wont allow the user to switch modals
		// it will stop the function
		if (isLoading) {
			return;
		}
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal, isLoading]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				disabled={isLoading}
			/>
			<Input
				placeholder="Name"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				disabled={isLoading}
			/>
			<Input
				placeholder="Username"
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				disabled={isLoading}
			/>
			<Input
				placeholder="Password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				disabled={isLoading}
			/>
		</div>
	);

	const footerContent = (
		<div className="mt-4 text-center text-neutral-400">
			<p>
				Already have an account?
				<button
					onClick={onToggle}
					className="cursor-pointer text-white hover:text-green-400 ml-2"
				>
					Login
				</button>
			</p>
		</div>
	);

	return (
		<Modal
			title="Create an Account"
			actionLabel="Register"
			body={bodyContent}
			footer={footerContent}
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			onSubmit={onSubmit}
		/>
	);
};

export default RegisterModal;
