from flask import Flask, request, jsonify
from google.cloud import storage, dialogflow_v2 as dialogflow
import json

app = Flask(__name__)

def delete_all_intents(project_id):
    """Delete all intents in the given Dialogflow project."""
    intents_client = dialogflow.IntentsClient()
    parent = dialogflow.AgentsClient.agent_path(project_id)
    intents = intents_client.list_intents(request={"parent": parent})

    for intent in intents:
        intents_client.delete_intent(request={"name": intent.name})
        print("Deleted intent: {}".format(intent.display_name))

def create_intent(project_id, display_name, training_phrases_parts, message_texts):
    """Create an intent of the given intent type."""
    intents_client = dialogflow.IntentsClient()
    parent = dialogflow.AgentsClient.agent_path(project_id)

    training_phrases = []
    for training_phrases_part in training_phrases_parts:
        part = dialogflow.Intent.TrainingPhrase.Part(text=training_phrases_part)
        training_phrase = dialogflow.Intent.TrainingPhrase(parts=[part])
        training_phrases.append(training_phrase)

    text = dialogflow.Intent.Message.Text(text=message_texts)
    message = dialogflow.Intent.Message(text=text)

    formatted_name = "How can you help me with " + display_name
    formatted_phrases = ["Tell me about " + part for part in training_phrases_parts]

    intent = dialogflow.Intent(
        display_name=formatted_name, training_phrases=training_phrases, messages=[message])

    response = intents_client.create_intent(request={"parent": parent, "intent": intent})

    print("Intent created: {}".format(response))

@app.route('/create-intents', methods=['POST'])
def create_intents():
    project_id = 'alorica-prototype'

    # Delete all existing intents first
    delete_all_intents(project_id)

    # Load JSON from Google Cloud Storage
    storage_client = storage.Client()
    bucket = storage_client.bucket('alorica-sitemap')
    blob = bucket.blob('intents_responses.json')
    data = json.loads(blob.download_as_text())

    for intent_name, response in data.items():
        create_intent(project_id, intent_name, [intent_name], [response])

    return jsonify({"status": "Intents created"}), 200

if __name__ == '__main__':
    app.run(debug=True)
