import os
from enum import Enum

# Define an Enum for environment variable keys
class EnvVariables(Enum):
    DEFAULT_API_PROVIDER = "DEFAULT_API_PROVIDER"
    DEFAULT_MODEL = "DEFAULT_MODEL"
    AZUREAI_API_BASE = "AZUREAI_API_BASE"
    AZUREAI_API_KEY = "AZUREAI_API_KEY"
    AZUREAI_API_VERSION = "AZUREAI_API_VERSION"
    OPENAI_API_KEY = "OPENAI_API_KEY"
    OPENAI_API_BASE = "OPENAI_API_BASE"
    CLAUDE_API_KEY = "CLAUDE_API_KEY"
    CLAUDE_ENDPOINT = "CLAUDE_ENDPOINT"
    APP_PASSCODE_KEY = "APP_PASSCODE_KEY"
    HOST = "HOST"
    PORT = "PORT"
    DEBUG = "DEBUG"
    ENABLE_SENTRY = "ENABLE_SENTRY"
    SENTRY_DSN = "SENTRY_DSN"
    SENTRY_ENVIRONMENT = "SENTRY_ENVIRONMENT"
    SENTRY_RELEASE = "SENTRY_RELEASE"

# Define a dictionary for default values
DEFAULT_VALUES = {
    EnvVariables.DEFAULT_API_PROVIDER: "OPENAI_NATIVE",
    EnvVariables.DEFAULT_MODEL: "gpt-4o",
    EnvVariables.AZUREAI_API_BASE: "",
    EnvVariables.AZUREAI_API_KEY: "",
    EnvVariables.AZUREAI_API_VERSION: "",
    EnvVariables.OPENAI_API_KEY: "",
    EnvVariables.OPENAI_API_BASE: "https://api.openai.com/v1/models/",
    EnvVariables.CLAUDE_API_KEY: "",
    EnvVariables.CLAUDE_ENDPOINT: "",
    EnvVariables.APP_PASSCODE_KEY: "",
    EnvVariables.HOST: "0.0.0.0",
    EnvVariables.PORT: 5001,
    EnvVariables.DEBUG: False,
    EnvVariables.ENABLE_SENTRY: False,
    EnvVariables.SENTRY_DSN: "",
    EnvVariables.SENTRY_ENVIRONMENT: "",
    EnvVariables.SENTRY_RELEASE: ""
}

def get_env_variable(key: EnvVariables):
    """Retrieve an environment variable or return its default value."""
    return os.environ.get(key.value, DEFAULT_VALUES[key])
