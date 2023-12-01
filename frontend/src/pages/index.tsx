// types/index.ts


// Then, in your page file (e.g., src/pages/index.tsx):
import { useState, FormEvent } from 'react';
import type { Message } from '../types'; // Adjust the path as necessary

export default function Home() {
	const [query, setQuery] = useState<string>('');
	const [conversation, setConversation] = useState<Message[]>([]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const userQuery = query;
		setConversation((prev) => [...prev, { type: 'user', text: userQuery }]);
		setQuery('');

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
		}
	};

	return (
		<div className="max-w-lg mx-auto my-10 p-4">
			<div className="mb-4">
				{conversation.map((message, index) => (
					<div
						key={index}
						className={`p-4 rounded-lg text-white my-2 ${message.type === 'user' ? 'bg-blue-500 ml-auto' : 'bg-green-500 mr-auto'}`}
					>
						{message.text}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} className="flex">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Ask about Alorica"
					className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
				/>
				<button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
					Send
				</button>
			</form>
		</div>
	);
}
