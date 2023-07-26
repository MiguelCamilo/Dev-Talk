import { ReactEventHandler, useCallback, useEffect, useState } from 'react';

import { toast } from 'react-hot-toast';
import axios from 'axios';

import useCurrentUser from '@/hooks/useCurrentUser';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import ImageUpload from '../ImageUpload';

import Modal from '../Modal';
import Input from '../Input';

const EditModal = () => {
	const { data: currentUser } = useCurrentUser();
	const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
	const editModal = useEditModal();

	const [profileImage, setProfileImage] = useState('');
	const [coverImage, setCoverImage] = useState('');
	const [name, setName] = useState('');
	const [username, setUserName] = useState('');
	const [bio, setBio] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// we dont want to pass an object into the dependencies
	useEffect(() => {
		setProfileImage(currentUser?.profileImage);
		setCoverImage(currentUser?.coverImage);
		setUserName(currentUser?.username);
		setName(currentUser?.name);
		setBio(currentUser?.bio);
	}, [
		currentUser?.name,
		currentUser?.username,
		currentUser?.bio,
		currentUser?.coverImage,
		currentUser?.profileImage,
	]);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			await axios.patch('/api/edit', {
				name,
				username,
				bio,
				coverImage,
				profileImage,
			});

			// this calls are hook to fetch the updated data
			mutateFetchedUser();

			toast.success('Update Succesful!');
			editModal.onClose();
		} catch (error: any) {
			if (error.response.status === 413) {
				toast.error('Image is too large. Upload an image under 2mbs in size.');
			} else {
				toast.error('Something went wrong.');
			}
		} finally {
			setIsLoading(false);
		}
	}, [
		name,
		username,
		bio,
		coverImage,
		profileImage,
		editModal,
		mutateFetchedUser,
	]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<ImageUpload
				value={profileImage}
				disabled={isLoading}
				onChange={(image) => setProfileImage(image)}
				label="Upload Profile Image"
			/>
			<ImageUpload
				value={coverImage}
				disabled={isLoading}
				onChange={(image) => setCoverImage(image)}
				label="Upload Cover Image"
			/>
			<Input
				placeholder="Name"
				onChange={(e) => setName(e.target.value)}
				value={name}
				disabled={isLoading}
			/>
			<Input
				placeholder="Username"
				onChange={(e) => setUserName(e.target.value)}
				value={username}
				disabled={isLoading}
			/>
			<textarea
				onChange={(e) => setBio(e.target.value)}
				value={bio || ''}
				disabled={isLoading}
				id="message"
				rows={6}
				className="block w-full rounded-lg border border-neutral-800 bg-black p-2.5  text-sm text-white"
				placeholder="Bio..."
			/>
		</div>
	);

	return (
		<Modal
			title="Edit Profile"
			actionLabel="Save"
			body={bodyContent}
			onSubmit={onSubmit}
			onClose={editModal.onClose}
			isOpen={editModal.isOpen}
			disabled={isLoading}
		/>
	);
};

export default EditModal;
