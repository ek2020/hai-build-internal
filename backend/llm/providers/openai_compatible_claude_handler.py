from openai import OpenAI
from utils.env_utils import EnvVariables, get_env_variable

class OpenAiCompatibleClaudeHandler():
    def __init__(self, model):
        self.api_key = get_env_variable(EnvVariables.CLAUDE_API_KEY)
        self.api_base = get_env_variable(EnvVariables.CLAUDE_ENDPOINT)
        self.model = model
        self.client = None
        self.configure_client()
    
    def configure_client(self):
        self.client = OpenAI(
            api_key = self.api_key,
            base_url = self.api_base
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
            print(f"Error during CLAUDEAI completion: {str(e)}")
            raise Exception("Failed to get a response from CLAUDEAI API")
    