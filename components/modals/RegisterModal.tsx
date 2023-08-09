import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SignInResponse, signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import {
	validatePassword,
	validateName,
	validateUsername,
} from '@/libs/validate';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';

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

	const onSubmit = useCallback(
		async (event: any) => {
			event.preventDefault();
			try {
				setIsLoading(true);

				if (!email || !password || !name || !username) {
					return toast.error('Please fill out required fields.', {
						id: 'register',
						style: { background: 'red', color: 'white', fontSize: 'small' },
					});
				}

				const passwordError = validatePassword(password);
				const usernameError = validateUsername(username);
				const nameError = validateName(name);

				if (passwordError) return;
				if (usernameError) return;
				if (nameError) return;

				// register user by sending data back to the register route
				await axios.post(`/api/register`, {
					email,
					password,
					name,
					username,
				});

				signIn('credentials', {
					email,
					password,
				});

				await axios.post('/api/registrationemail', {
					username,
					email,
				});

				registerModal.onClose();
				
				toast.success('Account Created Succesfully!', {
					id: 'account-created',
					style: { background: '#16a34a', color: 'white', fontSize: 'small' },
				});

			} catch (error: any) {
				toast.error(error.response.data.message, {
					id: 'message',
					style: { background: 'red', color: 'white', fontSize: 'small' },
				});
			} finally {
				setIsLoading(false);
			}
		},
		[registerModal, email, password, name, username],
	);

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
		<form onSubmit={onSubmit}>
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
					type="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					disabled={isLoading}
				/>
				<Input
					placeholder="Username"
					type="username"
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

			<div className="mt-5">
				<Button
					type="submit"
					onClick={onSubmit}
					disabled={isLoading}
					label="Register"
					secondary
					fullWidth
					large
				/>
			</div>
		</form>
	);

	const footerContent = (
		<div className="mt-4 text-center text-neutral-400">
			<p>
				Already have an account?
				<button
					onClick={onToggle}
					className="ml-2 cursor-pointer text-white hover:text-green-400"
				>
					Login
				</button>
			</p>
		</div>
	);

	return (
		<Modal
			title="Create an Account"
			body={bodyContent}
			footer={footerContent}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			onSubmit={() => {}}
		/>
	);
};

export default RegisterModal;
