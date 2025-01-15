from enum import Enum
from utils.env_utils import EnvVariables

# Define API providers as an Enum
class Providers(Enum):
    OPENAI_NATIVE = 'OPENAI_NATIVE'
    # OpenAI-compatible models refer to language models that are API-compatible with OpenAI's architecture and usage patterns
    OPENAI_COMPATIBLE_AZURE = 'OPENAI_COMPATIBLE_AZURE'
    OPENAI_COMPATIBLE_CLAUDE = 'OPENAI_COMPATIBLE_CLAUDE'
    AWS_BEDROCK_CLAUDE = 'AWS_BEDROCK_CLAUDE'

# Defined supported models as an Enum
class Models(Enum):
    GPT_4O = 'gpt-4o'
    GPT_4O_MINI = 'gpt-4o-mini'
    CLAUDE_3_5 = 'anthropic.claude-3-5-sonnet-20240620-v1:0'

# Defined the Provider and Model Config Map
PROVIDER_MODEL_CONFIG_MAP = {
    Providers.OPENAI_NATIVE.value: {
        'SUPPORTED_MODELS': [Models.GPT_4O.value, Models.GPT_4O_MINI.value],
        'MODEL_CONFIG_MAP': {
            Models.GPT_4O.value: {
                'CONFIG': [EnvVariables.OPENAI_API_KEY, EnvVariables.OPENAI_API_BASE],
                'HANDLER': ("llm.providers.openai_native_handler", "OpenAiNativeHandler")
            },
            Models.GPT_4O_MINI.value: {
                'CONFIG': [EnvVariables.OPENAI_API_KEY, EnvVariables.OPENAI_API_BASE],
                'HANDLER': ("llm.providers.openai_native_handler", "OpenAiNativeHandler")
            },
        },
    },
    Providers.OPENAI_COMPATIBLE_AZURE.value: {
        'SUPPORTED_MODELS': [Models.GPT_4O.value, Models.GPT_4O_MINI.value],
        'MODEL_CONFIG_MAP': {
            Models.GPT_4O.value: {
                'CONFIG': [EnvVariables.AZUREAI_API_KEY, EnvVariables.AZUREAI_API_BASE, EnvVariables.AZUREAI_API_VERSION],
                'HANDLER': ("llm.providers.openai_compatible_azure_handler", "OpenAiCompatibleAzureHandler")
            },
            Models.GPT_4O_MINI.value: {
                'CONFIG': [EnvVariables.AZUREAI_API_KEY, EnvVariables.AZUREAI_API_BASE, EnvVariables.AZUREAI_API_VERSION],
                'HANDLER': ("llm.providers.openai_compatible_azure_handler", "OpenAiCompatibleAzureHandler")
            },
        },
    },
    Providers.OPENAI_COMPATIBLE_CLAUDE.value: {
        'SUPPORTED_MODELS': [Models.CLAUDE_3_5.value],
        'MODEL_CONFIG_MAP': {
            Models.CLAUDE_3_5.value: {
                'CONFIG': [EnvVariables.CLAUDE_API_KEY, EnvVariables.CLAUDE_ENDPOINT],
                'HANDLER': ("llm.providers.openai_compatible_claude_handler", "OpenAiCompatibleClaudeHandler")
            },
        }
    },
}
