import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';

import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

const LoginModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			if (!email || !password) {
				 return toast.error('Please fill out required fields.', { id: 'login' });
			}

			await signIn('credentials', {
				email,
				password,
			});

			toast.success('Succesfully loged in!', { id: 'login' });
			loginModal.onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [loginModal, email, password]);

	const onToggle = useCallback(() => {
		// if user clicks register this wont allow the user to switch modals
		// it will stop the function
		if (isLoading) {
			return;
		}
		loginModal.onClose();
		registerModal.onOpen();
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
				First time using DevLink ?
				<button
					onClick={onToggle}
					className="ml-2 cursor-pointer text-white hover:text-green-400"
				>
					Create an account
				</button>
			</p>
		</div>
	);

	return (
		<Modal
			title="Login"
			actionLabel="Sign in"
			body={bodyContent}
			footer={footerContent}
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
		/>
	);
};

export default LoginModal;
