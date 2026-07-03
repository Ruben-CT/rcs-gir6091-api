import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateTaskPayload, Task, UpdateTaskPayload } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  findOne(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  create(payload: CreateTaskPayload): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, payload);
  }

  update(id: number, payload: UpdateTaskPayload): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
