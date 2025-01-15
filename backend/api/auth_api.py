from flask import Blueprint, request, jsonify
from utils.env_utils import get_env_variable, EnvVariables
from config.exceptions import CustomAppException
from config.logging_config import logger
import base64

auth_api = Blueprint('auth_api', __name__)

@auth_api.route("/api/auth/verify_access_token", methods=["POST"])
def verify_access_token():
    try:
        data = request.get_json()
        app_access_code = get_env_variable(EnvVariables.APP_PASSCODE_KEY)
        encoded_access_token = data.get("accessToken")
        if not encoded_access_token:
            return jsonify({"error": "Access token is required"}), 401
        decoded_access_token = base64.b64decode(encoded_access_token).decode("utf-8")

        if decoded_access_token == app_access_code:
            return jsonify({"valid": True}), 200
        else:
            return jsonify({"valid": False}), 401

    except Exception as e:
        logger.error("An error occurred during token verification: %s", str(e))
        return CustomAppException(e, status_code=500)
