import { toast } from 'react-hot-toast';
import { PuffLoader } from 'react-spinners';
import { useCallback, useState } from 'react';
import { SignInResponse, signIn } from 'next-auth/react';

import Input from '../Input';
import Modal from '../Modal';
import Button from '../Button';
import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { validatePassword } from '@/libs/validate';

import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

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
					<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-600 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-600">
						<p className="mx-4 mb-0 text-center font-semibold text-neutral-600">
							or
						</p>
					</div>
				</form>
			)}
		</>
	);

	const footerContent = (
		<>
			{isLoading ? null : (
				<div className="mt-3 flex w-full flex-col items-center gap-4">
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
							First time using DevLink ?
							<button
								onClick={onToggle}
								className="ml-2 cursor-pointer text-white hover:text-green-400"
							>
								Create an account
							</button>
						</p>
					</div>
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
