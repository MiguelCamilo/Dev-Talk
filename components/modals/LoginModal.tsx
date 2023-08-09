import { useCallback, useState } from 'react';
import { SignInResponse, signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import { validatePassword } from '@/libs/validate';
import { PuffLoader } from 'react-spinners';

const LoginModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const { data: currentUser } = useCurrentUser();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(
		async (event: any) => {
			event.preventDefault();
			try {
				if (!email || !password) {
					return toast.error('Please fill out required fields.', {
						id: 'login',
						style: { background: 'red', color: 'white', fontSize: 'small' },
					});
				}

				const passwordError = validatePassword(password);
				if (passwordError) return;

				// type for nextauth signIn
				const result: SignInResponse | undefined = await signIn('credentials', {
					redirect: false,
					email,
					password,
				});

				if (result?.status === 401) {
					toast.error('The email/password you entered is incorrect', {
						id: 'invalid-credentials',
						style: { background: 'red', color: 'white', fontSize: 'small' },
					});
					return;
				}

				setIsLoading(true);

				setTimeout(() => {
					setIsLoading(false);
					loginModal.onClose();
				}, 5.8 * 1000);

			} catch (error) {
				console.log(error);
			}
		},
		[loginModal, email, password],
	);

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
		<>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center">
					<PuffLoader color="green" />
					<p className="text-2xl font-bold text-neutral-600">Loading...</p>
				</div>
			) : (
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
							label="Login"
							secondary
							fullWidth
							large
						/>
					</div>
				</form>
			)}
		</>
	);

	const footerContent = (
		<>
			{isLoading ? null : (
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
			)}
		</>
	);

	return (
		<>
			<Modal
				title={isLoading ? null : 'Login'}
				body={bodyContent}
				footer={footerContent}
				disabled={isLoading}
				isOpen={loginModal.isOpen}
				onClose={loginModal.onClose}
				onSubmit={() => {}}
			/>
		</>
	);
};

export default LoginModal;
