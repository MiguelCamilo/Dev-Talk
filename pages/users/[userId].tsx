import Header from '@/components/Header';
import UserHero from '@/components/users/UserHero';
import UserBio from '@/components/users/UserBio';
import Form from '@/components/Form';

import useUser from '@/hooks/useUser';

import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';
import PostFeed from '@/components/posts/PostFeed';

const UserView = () => {
    const router = useRouter()
    // userId is coming from the query when you click
    // on the user profile the userId is passed to the url
    const { userId } = router.query

    const { data: fetchedUser, isLoading } = useUser(userId as string)

    // if loading or no provided fetched user
    if(isLoading || !fetchedUser) {
        return (
            <div 
                className='flex justify-center items-center h-full'>
                    <ClipLoader 
                        color='lightgreen'
                        size={80}
                    />
            </div>
        )
    }

	return (
		<>
			<Header showBackArrow label={fetchedUser?.name || 'User Profile'} />
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />
            {/* <Form placeholder="What's on your mind?" /> */}
            <PostFeed userId={userId as string} />
		</>
	);
};

export default UserView;
