from config.logging_config import logger
class ChatAgent():
    """Agent is built to handle the chat related functions"""
    def __init__(self, 
                 system_message: str = "You are helpful assistant") -> None:
        self.system_message: str = system_message

    def prepare_chat_messages_with_history(self, message: str, chat_history: list[dict]) -> list[dict]:
        """Prepare messages for LLM with system message and chat history."""
        logger.info("Entering <__prepare_messages> function")
        messages = [{"role": "system", "content": self.system_message}]

        # Append chat history if available
        if chat_history:
            for chat in chat_history:
                for key, value in chat.items():
                    messages.append({"role": key, "content": value})

        # Prioritize the user message last
        messages.append({"role": "user", "content": message})
        logger.info("Exiting <__prepare_messages> function")
        return messages