import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import Input from '../Input';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';

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
			
			if (!email || !password || !username || !username) {
				return toast.error('Please fill out required fields.', { id: 'register' });
		   }

			// register user by sending data back to the register route
			await axios.post(`/api/register`, {
				email,
				password,
				name,
				username,
			})

			toast.success('Account Created Succesfully!')

			signIn('credentials', {
				email,
				password
			})
			registerModal.onClose();
			
		} catch (error: any) {
			// console.log(error);
			toast.error(error.response.data.message, { id: 'message' })
		} finally {
			setIsLoading(false);
		}
	}, [registerModal, email, password, name, username]);

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
