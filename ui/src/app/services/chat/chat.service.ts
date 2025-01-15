import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  suggestionPayload,
  conversePayload,
} from '../../model/interfaces/chat.interface';
import { CHAT_TYPES } from '../../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  GET_SUGGESTIONS_URL: string = `chat/get_suggestions`;
  CONVERSATION_URL: string = `chat/update_requirement`;
  CONVERSATION_USER_STORY_URL: string = `chat/update_user_story_task`;

  constructor(private http: HttpClient) {}

  generateSuggestions(request: suggestionPayload): Observable<any> {
    // Skip default loader for chat suggestions.
    const headers = new HttpHeaders({
      skipLoader: 'true',
    });
    return this.http.post(this.GET_SUGGESTIONS_URL, request, {
      headers,
    });
  }

  chatWithLLM(type: string, request: conversePayload): Observable<any> {
    // Skip default loader for chat with LLM call.
    const headers = new HttpHeaders({
      skipLoader: 'true',
    });
    if (type === CHAT_TYPES.REQUIREMENT) {
      return this.http.post(this.CONVERSATION_URL, request, {
        headers,
      });
    } else {
      return this.http.post(this.CONVERSATION_USER_STORY_URL, request, {
        headers,
      });
    }
  }
}
