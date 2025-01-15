class CustomAppException(Exception):
    status_code = 500

    def __init__(self, message, status_code=None, payload=None):
        super().__init__()
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["message"] = self.message
        return rv

# Define custom exceptions
class ConfigurationError(Exception):
    """Custom exception for configuration errors."""
    pass

class InvalidAPIKeyError(ConfigurationError):
    """Raised when the API key is invalid or missing."""
    pass

class InvalidEndpointError(ConfigurationError):
    """Raised when the endpoint is invalid or missing."""
    pass