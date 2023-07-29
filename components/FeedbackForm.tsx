import { useState } from 'react';

import axios from 'axios';
import { toast } from 'react-hot-toast';

const FeedbackForm = () => {
	//! REFACTOR THIS CODE
	//? Formik
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleFeedBack = (event: any) => {
		event.preventDefault()

		axios
			.post(
				'https://getform.io/f/b712b844-23b5-4a25-921c-79d5c5421090',
				{
					name: name,
					message: message,
					email: email,
					location: 'DevLink'
				},
				{ headers: { Accept: 'application/json' } },
			)
			.then((response) => {
				toast.success('Thank you for your feedback');
				setName('')
				setEmail('')
				setMessage('')
			})
			.catch((error) => {
				toast.error('Whoops, something went wrong.');
			});
	};

	return (
		<section>
			<div>
				<div>
					<div className="rounded-lg  p-8 shadow-lg lg:col-span-3 lg:p-12">
						<form onSubmit={handleFeedBack} className="space-y-4">
							<h1 className="text-3xl font-extrabold text-white">
								How can we improve{' '}
								<span className="font-black italic text-green-500">Dev</span>
								<span className="font-black italic text-white delay-150 hover:text-green-500">
									Link
								</span>
								?
							</h1>
							<div>
								<label className="sr-only" htmlFor="name">
									Name
								</label>
								<input
									className="w-full rounded-lg border border-gray-200  bg-[#16181c] p-3 text-sm text-white"
									placeholder="Name"
									type="text"
									id="name"
									value={name}
									onChange={e => setName(e.target.value)}
								/>
								<input
									type="hidden"
									name="_gotcha"
									className="display:none !important"
								/>
							</div>
							<div className="grid grid-cols-1 gap-4 ">
								<div>
									<label className="sr-only" htmlFor="email">
										Email
									</label>
									<input
										className="w-full rounded-lg border border-gray-200 bg-[#16181c] p-3 text-sm text-white"
										placeholder="Email address"
										type="email"
										id="email"
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div>
								<label className="sr-only" htmlFor="message">
									Message
								</label>
								<textarea
									className="w-full rounded-lg border border-gray-200 bg-[#16181c] p-3 text-sm text-white"
									placeholder="Message"
									rows={8}
									id="message"
									value={message}
									onChange={e => setMessage(e.target.value)}
								/>
							</div>
							<div className="mt-4">
								<button
									type="submit"
									className="inline-block w-full rounded-lg bg-green-500 px-5 py-3 font-medium text-white sm:w-auto"
								>
									Send Feedback
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeedbackForm;
