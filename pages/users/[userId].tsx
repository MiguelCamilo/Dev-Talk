import Header from '@/components/Header';

import useUser from '@/hooks/useUser';

import { useRouter } from 'next/router';

const UserView = () => {
    const router = useRouter()
    // userId is coming from the query when you click
    // on the user profile the userId is passed to the url
    const { userId } = router.query


	// pass current user to label prop
    // const currentUser = useUser(userId)

	return (
		<>
			<Header showBackArrow label="User Profile" />
		</>
	);
};

export default UserView;
