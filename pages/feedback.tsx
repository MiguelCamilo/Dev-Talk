import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Header from '@/components/Header';
import FeedbackForm from '@/components/FeedbackForm';

export async function getServerSideProps(context: NextPageContext) {

	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}

const Feedback = () => {
	return (
		<>
			<Header label="Feedback" showBackArrow />
            <FeedbackForm />
		</>
	);
};

export default Feedback;
