from functools import wraps
from flask import request, jsonify
import base64
from utils.env_utils import get_env_variable, EnvVariables

def require_access_code():
    access_code = get_env_variable(EnvVariables.APP_PASSCODE_KEY)

    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Skip auth for verify_access_token endpoint
            if request.endpoint == 'verify_access_token':
                return f(*args, **kwargs)

            request_access_code = request.headers.get('X-Access-Code')
            # Check if access code is provided
            if not request_access_code:
                return jsonify({"error": "Access code is required"}), 401

            # Attempt to decode the access code, handling errors gracefully
            try:
                decoded_request_access_code = base64.b64decode(request_access_code).decode("utf-8")
            except (base64.binascii.Error, UnicodeDecodeError):
                return jsonify({"error": "Invalid access code format"}), 400

            # Compare decoded access code to expected code
            if decoded_request_access_code != access_code:
                return jsonify({"error": "Invalid access code"}), 401

            return f(*args, **kwargs)
        return decorated_function
    return decorator
