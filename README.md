# Alorica Chatbot Monorepo

## Overview

This monorepo contains both the frontend and backend for the Alorica Chatbot application. The frontend is built with Next.js and provides a user interface for interacting with the chatbot. The backend, developed in Python, handles Dialogflow interactions on Google Cloud Platform (GCP) for the chatbot.

## Repository Structure

- `frontend/`: Next.js application for the chatbot UI.
- `backend/`: Python scripts and Flask application for Dialogflow chatbot on GCP.

## Frontend (Next.js)

### Getting Started

To run the frontend development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

Edit `pages/index.tsx` to modify the homepage. The page auto-updates as you edit the file.

API routes can be found in `pages/api`.

### Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub repository](https://github.com/vercel/next.js/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

### Deploy on Vercel

[Deploy with Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## Backend (Python and Dialogflow on GCP)

### Overview

Backend components handle chatbot logic, including processing Alorica's website content and creating Dialogflow intents.

### Setup and Deployment

#### Prerequisites

- Google Cloud Platform account
- Python 3.x

#### Installation

```bash
pip install -r requirements.txt
```

#### Configuration

Set up Google Cloud credentials and permissions for Dialogflow API and Cloud Storage. Update configurations as needed.

#### Scripts

- `xml-to-csv.py`: Convert XML sitemap to CSV.
- `csv_cleaner.py`: Clean and preprocess CSV.
- `csv_processor.py`: Prepare data for Dialogflow.
- `intent_creator.py`: Create/update Dialogflow intents.

#### Deploying the Chatbot

Deploy `main.py` as a Google Cloud Function. Link and configure the Dialogflow agent.

### Usage

Interact with the deployed chatbot through Alorica's website or other integrated platforms.

### Contributing

Contributions are welcome. Please follow GitHub procedures for forking, changes, and pull requests.

## General Contributions

For contributions to either the frontend or backend, please follow the standard GitHub workflow:

1. Fork the repository.
2. Create a new branch for your feature.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.
