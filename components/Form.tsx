import { useCallback, useState } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import usePostModal from '@/hooks/usePostModal';

import Button from './Button';
import Avatar from './Avatar';

import toast from 'react-hot-toast';
import axios from 'axios';
import usePost from '@/hooks/usePost';

interface FormProps {
	placeholder: string;
	isComment?: boolean;
	isModal?: boolean;
	postId?: string;
}

const Form: React.FC<FormProps> = ({
	placeholder,
	isComment,
	isModal,
	postId,
}) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const postModal = usePostModal()

	const { data: currentUser } = useCurrentUser();
	const { mutate: mutatePosts } = usePosts();
	const { mutate: mutatePost } = usePost(postId as string);

	const [body, setBody] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			// if isComment then it will create a comment to a post by id
			// else just create a post
			const url = isComment ? `/api/comments?postId=${postId}` : `/api/posts`;

			await axios.post(url, { body });
			toast.success('You post was sent.', {
				duration: 4000,
				position: 'bottom-center',
				id: 'post-success',
				style: { background: '#16a34a', color: 'white', fontSize: 'small'},
			});

			if(postModal.isOpen){
				postModal.onClose()
			}

			setBody('');
			mutatePosts();
			mutatePost();
		} catch (error) {
			toast.error('Something went wrong.');
		} finally {
			setIsLoading(false);
		}
	}, [body, mutatePosts, mutatePost, isComment, postId, postModal]);

	return (
		<div className="border-b-[1px] border-neutral-800 px-5 py-2">
			{currentUser ? (
				<div className="flex flex-row gap-4">
					<div>
						<Avatar userId={currentUser?.id} />
					</div>

					<div className="relative w-full">
						<textarea
							disabled={isLoading}
							onChange={(e) => setBody(e.target.value)}
							value={body}
							className={`${
								isModal
									? 'peer mt-3 w-full resize-none bg-black text-[15px] text-white placeholder-neutral-500 outline-none ring-0 disabled:opacity-80'
									: 'peer mt-3 w-full resize-none bg-[#16181c] text-[15px] text-white placeholder-neutral-500 outline-none ring-0 disabled:opacity-80'
							}`}
							placeholder={placeholder}
						/>
						<p className="absolute right-0 top-10 text-neutral-500">
							{body.length}
						</p>
						<hr className="h-[1px] border-neutral-800 opacity-100 transition" />
						<div className="mt-4 flex flex-row justify-end">
							<Button
								label="Share"
								disabled={isLoading || !body}
								onClick={onSubmit}
								secondary
								fullWidth={isModal}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="py-8">
					<h1 className="mb-4 text-center text-2xl font-bold text-white">
						Welcome to{' '}
						<span className="font-black italic text-green-400">Dev</span>
						<span className="font-black italic">Link</span>
					</h1>

					<div className="flex flex-col items-center justify-center gap-4">
						<Button
							label="Login"
							type="submit"
							onClick={loginModal.onOpen}
							secondary
							fullWidth
						/>
						<Button
							label="Register"
							type="submit"
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
