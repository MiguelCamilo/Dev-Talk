import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';

import { ClipLoader } from 'react-spinners';

interface PostFeedProps {
    userId?: string;
}

const PostFeed: React.FC <PostFeedProps> = ({
    userId,
}) => {
    const { data: posts = [], isLoading } = usePosts(userId) 

    
	const randomQuotes = [
		'This profile is currently as blank as my mind during an exam.',
		'This page is giving me 404 error vibes with all its nothingness.',
        "Empty...Dry...Nothing to see...just like my DM's",
        "Is this the Krusty Krab? ...NO, this is Patrick!"
	];

    const randomQuotesIndex = Math.floor(Math.random() * randomQuotes.length)

	if (isLoading || posts.length === 0) {
		return (
			<div
				role="status"
				className="space-y-8 md:flex md:items-center md:space-x-8 md:space-y-0"
			>
				<div className="flex flex-col h-[17rem] w-full items-center justify-center">
					<p className="text-sm sm:text-md text-center font-bold text-neutral-400 italic">
                        {`"${randomQuotes[randomQuotesIndex]}"`}
					</p>
                    <span className='text-xs italic text-center mt-1 text-neutral-500'>
                        - DevLink
                    </span>
				</div>
			</div>
		);
	}

    return ( 
        <>
            {posts.map((post: Record<string, any>) => (
                <PostItem 
                    key={post.id}
                    userId={userId}
                    data={post}
                />
            ))}
        </>
     );
}
 
export default PostFeed;