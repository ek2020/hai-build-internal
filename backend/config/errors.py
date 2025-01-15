from flask import jsonify
from config.exceptions import CustomAppException


def register_error_handlers(app):
    @app.errorhandler(CustomAppException)
    def handle_custom_app_exception(e):
        response = jsonify(e.to_dict())
        response.status_code = e.status_code
        return response

    @app.errorhandler(Exception)
    def handle_general_exception(e):
        response = jsonify({"error": "An unexpected error occurred", "message": str(e)})
        response.status_code = 500
        return response
