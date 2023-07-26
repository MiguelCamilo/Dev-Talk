import { useCallback, useState } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';

import Button from './Button';
import Avatar from './Avatar';

import toast from 'react-hot-toast';
import axios from 'axios';

interface FormProps {
	placeholder: string;
	isComment?: boolean;
	postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const { data: currentUser } = useCurrentUser();
	const { mutate: mutatePosts } = usePosts();

	const [body, setBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			await axios.post('/api/posts', { body });
			toast.success('You post was sent.');

			setBody('');
			mutatePosts();
		} catch (error) {
			toast.error('Something went wrong.');
		} finally {
			setIsLoading(false);
		}
	}, [body, mutatePosts]);


	return (
		<div className="border-b-[1px] border-neutral-800 px-5 py-2">
			{currentUser ? (
				<div className="flex flex-row gap-4">
					<div>
						<Avatar userId={currentUser?.id} />
					</div>

					<div className="w-full relative">
						<textarea
							disabled={isLoading}
							onChange={(e) => setBody(e.target.value)}
							value={body}
							className="peer mt-3 w-full resize-none bg-[#16181c] text-[15px] text-white placeholder-neutral-500 outline-none ring-0 disabled:opacity-80"
							placeholder={placeholder}
						/>
                        <p className='text-neutral-500 absolute top-10 right-0'>{body.length}</p>
						<hr className="h-[1px] border-neutral-800 transition opacity-100" />
                        <div className='mt-4 flex flex-row justify-end'>
                            <Button label='Share' disabled={isLoading || !body} onClick={onSubmit} secondary/>
                        </div>
					</div>
				</div>
			) : (
				<div className="py-8">
					<h1 className="mb-4 text-center text-2xl font-bold text-white">
						Welcome to <span className='text-green-400 font-black italic'>Dev</span><span className='font-black italic'>Link</span>
					</h1>

					<div className="flex flex-col items-center justify-center gap-4">
						<Button
							label="Login"
							onClick={loginModal.onOpen}
							secondary
							fullWidth
						/>
						<Button
							label="Register"
							onClick={registerModal.onOpen}
							fullWidth
							secondary
							outline
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Form;
