import { useState } from 'react';

import Modal from '../Modal';
import Form from '../Form';

import usePostModal from '@/hooks/usePostModal';

const PostModal = () => {
	const [isLoading, setIsLoading] = useState(false)

    const postModal = usePostModal()

    const bodyContent = (
        <>
            <Form 
                placeholder="What's on your mind?" 
                isModal={true}
            />
        </>
    )

	return (
		<Modal
			title="Share your thoughts!"
			actionLabel=""
			body={bodyContent}
			onSubmit={() => {}}
            onClose={postModal.onClose}
            isOpen={postModal.isOpen}
			disabled={isLoading}
		/>
	);
};

export default PostModal;
