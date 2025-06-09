import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl =
    'http://localhost:5001/atom-challenge-6e114/us-central1/api/users';

  constructor(private http: HttpClient) {}

  create(payload: { email: string }): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, payload);
  }
}
