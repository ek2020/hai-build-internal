from flask_executor import Executor

class ExecutorConfig:
    _instance = None
    _executor = None

    def __new__(cls, app=None):
        if cls._instance is None:
            cls._instance = super(ExecutorConfig, cls).__new__(cls)
            if app is not None:
                cls._executor = Executor(app)
        return cls._instance

    def get_executor(self):
        if self._executor is None and app is not None:
            self._executor = Executor(app)
        return self._executor
