import { useEffect } from 'react';

import { PuffLoader } from 'react-spinners';

import useCurrentUser from '@/hooks/useCurrentUser';
import useNotifications from '@/hooks/useNotifications';
import { MdNotificationsNone } from 'react-icons/md';

const NotificationsFeed = () => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

	// the will refetch the currentuser since in the notifications api route
	// we are updating the hasNotifications to false
	useEffect(() => {
		mutateCurrentUser();
	}, [mutateCurrentUser]);

	if (fetchedNotifications.length === 0) {
		return (
			<>
				<div className="p-6 text-center text-3xl font-extrabold text-white">
					Nothing to see here
				</div>
                <div className='text-sm text-center p-6 text-neutral-500'>
                    Connect with more people to view likes, comments, and more.
                </div>
                <div className='flex items-center justify-center'>
                <PuffLoader color='green' />
                </div>
			</>
		);
	}
	return (
        <div className='flex flex-col'>
            {fetchedNotifications.map((notification: Record<string, any>) => (
                <div key={notification.id} className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'>
                    <MdNotificationsNone color='green' size={32} />
                    <p className='text-white'>
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    )
};

export default NotificationsFeed;
