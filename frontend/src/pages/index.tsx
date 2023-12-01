// types/index.ts


// Then, in your page file (e.g., src/pages/index.tsx):
import { useState, FormEvent } from 'react';
import type { Message } from '../types'; // Adjust the pa
import { Spinner } from '@nextui-org/react';// th as necessary

export default function Home() {
	const [query, setQuery] = useState<string>('');
	const [conversation, setConversation] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const userQuery = query;
		setConversation((prev) => [...prev, { type: 'user', text: userQuery }]);
		setQuery('');
		setIsLoading(true); // Set loading to true

		try {
			const res = await fetch('/api/alorica', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ queryResult: { queryText: userQuery } }),
			});
			const data = await res.json();
			setConversation((prev) => [...prev, { type: 'user', text: userQuery }, { type: 'bot', text: data.fulfillmentText }]);
		} catch (error) {
			console.error('Error:', error);
			setConversation((prev) => [...prev, { type: 'user', text: userQuery }, { type: 'bot', text: 'Error communicating with the server.' }]);
		} finally {
			setIsLoading(false); // Set loading to false
		}
	};

	return (
		<div className="min-h-screen bg-aloricaLightGray">
			<header className="bg-white py-4">
				<div className="max-w-lg mx-auto flex justify-center">
					<img src="https://www.alorica.com/images/default-source/alorica/website2-0__header-logo.svg?sfvrsn=54b0b15c_0" alt="Alorica Logo" className="h-8" />
				</div>
			</header>

			<div className="max-w-lg mx-auto my-10 p-4">
				<div className="mb-4">
					{/* Message bubbles */}
					{conversation.map((message, index) => (
						<div key={index} className={`p-4 rounded-lg text-white my-2 ${message.type === 'user' ? 'bg-aloricaBlue ml-auto' : 'bg-aloricaGray mr-auto'}`}>
							{message.text}
						</div>
					))}
				</div>

				{/* Chat input form */}
				<form onSubmit={handleSubmit} className="flex">
					<input
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Ask about Alorica"
						className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
					/>
					<button type="submit" className="bg-aloricaBlue text-white p-2 rounded-r-lg">
						Send
					</button>
				</form>
			</div>
		</div>
	);
}
