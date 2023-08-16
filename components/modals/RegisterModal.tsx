import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
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

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

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
			<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-600 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-600">
				<p className="mx-4 mb-0 text-center font-semibold text-neutral-600">
					or
				</p>
			</div>
		</form>
	);

	const footerContent = (
		<div className="mt-3 flex flex-col items-center gap-4">
			<button
				onClick={() => signIn('google')}
				className="mb-2 mr-2 inline-flex w-full justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center  text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-[#24292F]/50"
			>
				<FcGoogle size={17} className="-ml-1 mr-2 h-5 w-6" />
				Continue with Google
			</button>

			<button
				onClick={() => signIn('github')}
				type="button"
				className="mb-2 mr-2 inline-flex w-full justify-center rounded-lg bg-[#24292F] px-5 py-2.5  text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:ring-4 focus:ring-[#24292F]/50"
			>
				<AiFillGithub size={17} className="-ml-1 mr-2 h-5 w-6" />
				Continue with Github
			</button>
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
