import logging


# Uncomment Cloud Watch Related code to use it - with your own AWS Creds
logger = logging.getLogger("requirementapp-backend")
logger.setLevel(logging.INFO)

if not logger.handlers:

    # # Create a CloudWatch log handler
    # cloudwatch_handler = watchtower.CloudWatchLogHandler(log_group="backend", boto3_client=boto_client)

    # Create a console log handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.DEBUG)

    # Define log message format
    formatter = logging.Formatter(
        "[%(asctime)s] %(levelname)s [%(name)s] [%(pathname)s:%(lineno)d] in %(module)s: %(message)s",
        "%Y-%m-%d %H:%M:%S",
    )
    console_handler.setFormatter(formatter)

    # Add handlers to the logger

    # cloudwatch_handler.setFormatter(formatter)
    # logger.addHandler(cloudwatch_handler)
    logger.addHandler(console_handler)
