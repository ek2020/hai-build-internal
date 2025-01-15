from llm.llm_constants import *
from config.exceptions import CustomAppException
from utils.common_utils import create_instance
from utils.env_utils import get_env_variable
import os

class MultiModelRouter():
    _instance = None
    _llm_handler_cache = {}

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(MultiModelRouter, cls).__new__(cls)
        return cls._instance
            
    def check_handler_env_config(self, provider, model):
        provider_config = PROVIDER_MODEL_CONFIG_MAP.get(provider, None)
        if (provider_config is None):
            raise CustomAppException("Provider Not Found")
        
        if (model not in provider_config.get('SUPPORTED_MODELS')):
            raise CustomAppException("Model under given Provider Not Found")
        
        model_env_config = dict(((i, get_env_variable(i)) for i in provider_config.get('MODEL_CONFIG_MAP').get(model).get('CONFIG')))
        for i in model_env_config:
            if model_env_config[i] is None or model_env_config[i] == "":
                raise CustomAppException(f"{i} is missing the give Model config")
            else:
                return

    def create_handler(self, provider, model):
        handler_cache_key = (provider, model)
        if handler_cache_key in self._llm_handler_cache:
            return self._llm_handler_cache[handler_cache_key]

        provider_config = PROVIDER_MODEL_CONFIG_MAP.get(provider, None)
        if (provider_config is None):
            raise CustomAppException("Provider Not Found")
        
        if (model not in provider_config.get('SUPPORTED_MODELS')):
            raise CustomAppException("Model under given Provider Not Found")
        
        # Get Handler
        module_name, class_name = provider_config.get('MODEL_CONFIG_MAP').get(model).get('HANDLER', (None, None))

        if module_name and class_name:
            handler_instance = create_instance(module_name, class_name, model)
            self._llm_handler_cache[handler_cache_key] = handler_instance
            return handler_instance
        else:
            raise CustomAppException("Handler Not Found")


    def execute(self, prompt, provider, model):
        handler = self.create_handler(provider, model)
        self.check_handler_env_config(provider, model)
        response = handler.completion(prompt)
        return response

multiModalRouter = MultiModelRouter()
