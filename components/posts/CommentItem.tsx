import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

import { formatDistanceToNowStrict } from 'date-fns';

interface CommentItemProps {
    data: Record<string, any>;
}

const CommentItem: React.FC <CommentItemProps> = ({ data }) => {
    const router = useRouter()
    
    const goToUser = useCallback((event: any) => {
        event.stopPropagation()
        
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])

    const createdAt = useMemo(() => {
		if (!data?.createdAt) {
			return null;
		}

		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data.createdAt]);

    return ( 
        <div className='border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-800 transition'>
            
        </div>
     );
}
 
export default CommentItem;