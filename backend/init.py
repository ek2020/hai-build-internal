import uuid
import sentry_sdk
from sentry_sdk.integrations.logging import LoggingIntegration

from flask_cors import CORS
from flask import Flask, request, g
from config.errors import register_error_handlers
from config.logging_config import logger
from utils.env_utils import get_env_variable, EnvVariables
from api.auth_api import auth_api
from api.chat_api import chat_api
from api.common_api import common_api
from api.solution_api import solution_api
from config.executor import ExecutorConfig

# from dotenv import load_dotenv

# load_dotenv('.env')
enableSentry = str(get_env_variable(EnvVariables.ENABLE_SENTRY)).strip().lower() == 'true'
host = get_env_variable(EnvVariables.HOST)
port = get_env_variable(EnvVariables.PORT)
debug = str(get_env_variable(EnvVariables.DEBUG)).strip().lower() == 'true'
sentry_dsn = get_env_variable(EnvVariables.SENTRY_DSN)
environment = get_env_variable(EnvVariables.SENTRY_ENVIRONMENT)
release = get_env_variable(EnvVariables.SENTRY_RELEASE)


if enableSentry:
    print("sentry configuration is enabled.")
    sentry_sdk.init(
        dsn=get_env_variable(EnvVariables.SENTRY_DSN),
        environment=get_env_variable(EnvVariables.SENTRY_ENVIRONMENT),
                integrations=[
                    LoggingIntegration(
                        level=None,  # Capture all logs as breadcrumbs
                        event_level="ERROR"  # Send only logs of level ERROR and higher as events
                    )
                ],
                release=get_env_variable(EnvVariables.SENTRY_RELEASE),
                enable_tracing=True,
                attach_stacktrace=True,
                profiles_sample_rate=1.0,
    )
else:
    print("sentry configuration is disabled.")


app = Flask(__name__)
# Configure the executor using the ConfigureExecutor singleton class
executor = ExecutorConfig(app).get_executor()
app.config['EXECUTOR_MAX_WORKERS'] = 5

# Middleware to handle `X-Model` header
@app.before_request
def set_model_env():
    model = request.headers.get('X-Model')
    provider = request.headers.get('X-Provider')
    if model and provider:
        g.current_model = model
        g.current_provider = provider
        app.logger.info(f"Set PROVIDER to {provider}")
        app.logger.info(f"Set MODEL to {model}")
    else:
        g.current_model = get_env_variable(EnvVariables.DEFAULT_MODEL)
        g.current_provider = get_env_variable(EnvVariables.DEFAULT_API_PROVIDER)
        app.logger.info(f"Set MODEL to default")
        app.logger.info(f"Set PROVIDER to default")

@app.after_request
def add_model_used_header(response):
    response.headers['X-Model-Used'] = g.current_model
    response.headers['X-Provider-Used'] = g.current_provider
    app.logger.info(f"Request completed with MODEL {g.current_model} and APIProvider {g.current_provider}")
    return response

register_error_handlers(app)

CORS(app, resources={r"/*": {"origins": "*", "send_wildcard": "False"}})

@app.before_request
def start_request():
    g.request_id = uuid.uuid4()  # Generate a unique ID for each request
    logger.info(f"Request {g.request_id}: {request.method} {request.path} started")

@app.after_request
def log_request(response):
    logger.info(f"Request {g.request_id}: {request.method} {request.path} completed with status {response.status_code}")
    return response

def log_exception(e):
    logger.exception(f"Request {g.request_id} failed with error: {str(e)}")

app.register_blueprint(common_api)  # Register the common_api blueprint
app.register_blueprint(auth_api)  # Register the auth_api blueprint
app.register_blueprint(chat_api)  # Register the chat_api blueprint
app.register_blueprint(solution_api)  # Register the solution_api blueprint

if __name__ == "__main__":
    app.run(host=host, port=port, debug=debug)
    logger.info("Server started")
