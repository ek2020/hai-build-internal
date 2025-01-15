import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, map, switchMap, mergeMap, concatMap, toArray } from 'rxjs/operators';
import { JIRA_TOAST } from '../../constants/toast.constant';
import { ToasterService } from '../../services/toaster/toaster.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  constructor(
    private http: HttpClient,
    private toast: ToasterService,
  ) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      skipLoader: 'true',
    });
  }

  private createEpic(payload: any, token: string): Observable<any> {
    const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue`;
    const issueData = {
      fields: {
        project: { key: payload.projectKey },
        summary: payload.epicName,
        description: payload.epicDescription,
        issuetype: { name: 'Epic' },
      },
    };

    return this.http
      .post(issueUrl, issueData, { headers: this.getHeaders(token) })
      .pipe(
        map((epic: any) => epic),
        catchError(this.handleError),
      );
  }

  private updateEpic(payload: any, token: string): Observable<any> {
    const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue/${payload.epicTicketId}`;
    const updateData = {
      fields: {
        summary: payload.epicName,
        description: payload.epicDescription,
      },
    };

    return this.http
      .put(issueUrl, updateData, { headers: this.getHeaders(token) })
      .pipe(
        map((updated: any) => updated),
        catchError(this.handleError),
      );
  }

  createOrUpdateEpic(payload: any, token: string): Observable<any> {
    if (payload.epicTicketId) {
      const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue/${payload.epicTicketId}`;
      return this.http.get(issueUrl, { headers: this.getHeaders(token) }).pipe(
        switchMap((issue: any) => {
          if (
            issue.fields.summary !== payload.epicName ||
            issue.fields.description !== payload.epicDescription
          ) {
            return this.updateEpic(payload, token);
          } else {
            return of(issue);
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return this.createEpic(payload, token);
          } else {
            return throwError(error);
          }
        }),
      );
    } else {
      return this.createEpic(payload, token);
    }
  }

  createOrUpdateStory(
    payload: any,
    feature: any,
    token: string,
  ): Observable<any> {
    if (feature.storyTicketId) {
      const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue/${feature.storyTicketId}`;
      return this.http.get(issueUrl, { headers: this.getHeaders(token) }).pipe(
        switchMap((issue: any) => {
          if (
            issue.fields.summary !== feature.name ||
            issue.fields.description !== feature.description
          ) {
            return this.updateStory(payload, feature, token);
          } else {
            return of(issue);
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return this.createStory(payload, feature, token);
          } else {
            return throwError(error);
          }
        }),
      );
    } else {
      return this.createStory(payload, feature, token);
    }
  }

  private createStory(
    payload: any,
    feature: any,
    token: string,
  ): Observable<any> {
    const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue`;
    const issueData = {
      fields: {
        project: { key: payload.projectKey },
        summary: feature.name,
        description: feature.description,
        issuetype: { name: 'Story' },
        parent: { key: payload.epicTicketId },
      },
    };

    return this.http
      .post(issueUrl, issueData, { headers: this.getHeaders(token) })
      .pipe(
        map((story: any) => story),
        catchError(this.handleError),
      );
  }

  private updateStory(
    payload: any,
    feature: any,
    token: string,
  ): Observable<any> {
    const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue/${feature.storyTicketId}`;
    const updateData = {
      fields: {
        summary: feature.name,
        description: feature.description,
      },
    };

    return this.http
      .put(issueUrl, updateData, { headers: this.getHeaders(token) })
      .pipe(
        map((updated: any) => updated),
        catchError(this.handleError),
      );
  }

  createOrUpdateSubTask(
    payload: any,
    storyKey: string,
    task: any,
    token: string,
  ): Observable<any> {
    if (task.subTaskTicketId) {
      const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue/${task.subTaskTicketId}`;
      return this.http.get(issueUrl, { headers: this.getHeaders(token) }).pipe(
        switchMap((issue: any) => {
          if (
            issue.fields.summary !== task.list ||
            issue.fields.description !== task.acceptance
          ) {
            return this.updateSubTask(payload, task, token);
          } else {
            return of(issue);
          }
        }),
        catchError((error) => {
          if (error.status === 404) {
            return this.createSubTask(payload, storyKey, task, token); // Sub-task not found, create a new one
          } else {
            return throwError(error);
          }
        }),
      );
    } else {
      return this.createSubTask(payload, storyKey, task, token);
    }
  }

  private createSubTask(
    payload: any,
    storyKey: string,
    task: any,
    token: string,
  ): Observable<any> {
    const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue`;
    const issueData = {
      fields: {
        project: { key: payload.projectKey },
        summary: task.list,
        description: task.acceptance,
        issuetype: { name: 'Sub-task' },
        parent: { key: storyKey },
      },
    };

    return this.http
      .post(issueUrl, issueData, { headers: this.getHeaders(token) })
      .pipe(
        map((subTask: any) => subTask),
        catchError(this.handleError),
      );
  }

  private updateSubTask(
    payload: any,
    task: any,
    token: string,
  ): Observable<any> {
    const issueUrl = `${payload.jiraUrl}/rest/api/latest/issue/${task.subTaskTicketId}`;
    const updateData = {
      fields: {
        summary: task.list,
        description: task.acceptance,
      },
    };

    return this.http
      .put(issueUrl, updateData, { headers: this.getHeaders(token) })
      .pipe(
        map((updated: any) => updated),
        catchError(this.handleError),
      );
  }

  createOrUpdateTickets(payload: any): Observable<any> {
    this.toast.showInfo(JIRA_TOAST.INFO);
    return this.createOrUpdateEpic(payload, payload.token).pipe(
      switchMap((epic: any) => {
        payload.epicTicketId = epic.key;

        const result = {
          epicName: payload.epicName,
          epicTicketId: epic.key,
          features: [] as any[],
        };

        const storyRequests = from(payload.features).pipe(
          mergeMap(
            (feature: any) =>
              this.createOrUpdateStory(payload, feature, payload.token).pipe(
                switchMap((story: any) => {
                  const storyDetails = {
                    storyName: feature.name,
                    storyTicketId: story.key,
                    tasks: [] as any[],
                  };

                  if (feature.tasks) {
                    const taskRequests = from(feature.tasks).pipe(
                      mergeMap(
                        (task: any) =>
                          this.createOrUpdateSubTask(
                            payload,
                            story.key,
                            task,
                            payload.token,
                          ).pipe(
                            map((subTask: any) => {
                              storyDetails.tasks.push({
                                subTaskName: task.list,
                                subTaskTicketId: subTask.key,
                              });
                            }),
                          ),
                        environment.JIRA_RATE_LIMIT_CONFIG,
                      ),
                    );

                    return taskRequests.pipe(
                      map(() => {
                        result.features.push(storyDetails);
                      }),
                    );
                  } else {
                    result.features.push(storyDetails);
                    return of(null);
                  }
                }),
              ),
            environment.JIRA_RATE_LIMIT_CONFIG,
          ),
        );

        return storyRequests.pipe(
          concatMap(() => of(null)),
          toArray(),
          map(() => result));
      }),
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
