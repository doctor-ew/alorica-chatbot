// pages/api/alorica.ts
export default async function handler(req:any, res:any) {
	if (req.method === 'POST') {
		try {
			const response = await fetch('https://us-central1-alorica-prototype.cloudfunctions.net/alorica_chatbot', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(req.body),
			});

			const data = await response.json();
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: 'Error communicating with Dialogflow', error });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
