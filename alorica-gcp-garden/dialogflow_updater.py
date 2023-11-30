from google.cloud import dialogflow_v2 as dialogflow
from google.oauth2 import service_account

# Google Cloud project ID
project_id = 'alorica-prototype'

# Path to your service account key file
key_path = '/Users/doctorew/Library/CloudStorage/Dropbox/__HOME__/alorica-prototype-b5336d679c2d.json'

# Authenticate with the service account
credentials = service_account.Credentials.from_service_account_file(key_path)
client = dialogflow.IntentsClient(credentials=credentials)
parent = dialogflow.AgentsClient.agent_path(project_id)

# Iterate over all intents and enable webhook
for intent in client.list_intents(request={"parent": parent}):
    intent.webhook_state = dialogflow.Intent.WebhookState.WEBHOOK_STATE_ENABLED
    print(f"|-o-| Parent: {parent} :: Intent: {intent.display_name}")
    client.update_intent(intent=intent, language_code='en')  # Specify the language code if necessary

print("Webhooks enabled for all intents.")
