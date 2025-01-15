export interface RequestEpic {
  epicName: string;
  epicDescription: string;
  epicTicketId: string;
  projectKey: string;
  features: RequestFeature[];
}

export interface RequestFeature {
  id: string;
  name: string;
  storyTicketId: string;
  description: string;
  tasks: RequestTask[];
  chatHistory: RequestChatHistory[];
}

export interface RequestTask {
  id: string;
  subTaskTicketId: string;
  list: string;
  acceptance: string | string[];
}

export interface RequestChatHistory {
  user?: string;
  assistant?: string;
  isAdded?: boolean;
}

export interface ResponseEpic {
  epicName: string;
  epicTicketId: string;
  features: ResponseFeature[];
}

export interface ResponseFeature {
  storyName: string;
  storyTicketId: string;
  tasks: ResponseTask[];
}

export interface ResponseTask {
  subTaskName: string;
  subTaskTicketId: string;
}


