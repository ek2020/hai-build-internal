from openai import AzureOpenAI
from utils.env_utils import EnvVariables, get_env_variable

class OpenAiCompatibleAzureHandler():
    def __init__(self, model):
        self.api_key = get_env_variable(EnvVariables.AZUREAI_API_KEY)
        self.api_base = get_env_variable(EnvVariables.AZUREAI_API_BASE)
        self.api_version = get_env_variable(EnvVariables.AZUREAI_API_VERSION)
        self.client = None
        self.model = model
        self.configure_client()
    
    def configure_client(self):
        self.client = AzureOpenAI(
            azure_endpoint = self.api_base,
            api_key=self.api_key,
            api_version=self.api_version
        )
        return self.client


    def completion(self, prompt):
        try:
            response = self.client.chat.completions.create(
                model = self.model,
                messages = prompt
            )
            return response.choices[0].message.content
        except Exception as e:
            # Log the error and raise a custom exception
            print(f"Error during AZUREAI completion: {str(e)}")
            raise Exception("Failed to get a response from AZUREAI API")