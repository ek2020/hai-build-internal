import importlib
import os
from git import Repo
from jinja2 import BaseLoader, Environment, FileSystemLoader
from langchain_aws.retrievers import AmazonKnowledgeBasesRetriever
from config.logging_config import logger


def render_template(prompt_src: str) -> str:
    env = Environment(loader=BaseLoader(), autoescape=True)
    template = env.from_string(prompt_src)
    return template

def get_template_env() -> Environment:
    env = Environment(loader=FileSystemLoader([
        'llm/prompts', 'llm/prompts/solution', 'llm/prompts/context', 'llm/prompts/chat'
    ]), autoescape=True)
    return env

def create_git_project(path):
    repo = Repo.init(path)
    return repo

def commit_all_changes(repo, commit_message):
    # Add all changes to the staging area
    repo.git.add(A=True)
    # Commit the changes
    repo.git.commit(m=commit_message)

def push_changes(repo, remote_name='origin', branch='master'):
    # Push the changes to the remote repository
    repo.git.push(remote_name, branch)

def get_project_info(repo):
    latest_commit_message = repo.head.commit.message
    latest_commit_author = repo.head.commit.author
    latest_commit_date = repo.head.commit.committed_date
    return latest_commit_message, latest_commit_author, latest_commit_date

def check_file_exists(file_path):
    return os.path.isfile(file_path)

def update_llm_response_with_user_input(data, value, key_name=None):
    for item in data:
        for key in item:
            if key != 'id':
                if key_name:
                    item[key_name] = (item[key] + ' ' + value).strip()
                else:
                    item[key] += value
    return data


def override_llm_response_with_user_input(data, existing_value, value, key_name=None):
    for item in data:
        for key in item:
            if key != 'id':
                if key_name:
                    item[key_name] = value
                else:
                    item[key] = (existing_value + ' ' + value).strip()
    return data


def add_knowledge_base_to_prompt(prompt, knowledge_base):
    """
    Adds knowledge base content to the prompt if a valid knowledge base is provided.

    :param prompt: Original user query prompt
    :param knowledge_base: The name of the knowledge base to retrieve
    :return: Updated prompt with knowledge base content
    """
    logger.info("Entering <add_knowledge_base_to_prompt>")
    if knowledge_base:
        logger.info("Using Bedrock Knowledge Base")
        retriever = AmazonKnowledgeBasesRetriever(
            knowledge_base_id=knowledge_base,
            retrieval_config={"vectorSearchConfiguration": {"numberOfResults": 4}},
        )

        result = retriever.invoke(prompt)
        references = [i.dict()['page_content'] for i in result]

        # Prioritize the knowledge base references in the prompt
        knowledge_base_message = "\n\nConsider these references as strict constraints:\n" + "\n".join(references) + \
                                  "\n\nMake sure all responses adhere to these strict exclusivity rules."
        prompt = knowledge_base_message + "\n\nUser Query:\n" + prompt
        logger.info("Exiting <add_knowledge_base_to_prompt>")
    return prompt


def create_instance(module_name, class_name, *args, **kwargs):
    module = importlib.import_module(module_name)
    cls = getattr(module, class_name, None)
    if cls is None:
        raise ValueError(f"Class '{class_name}' not found in module '{module_name}'!")
    return cls(*args, **kwargs)
