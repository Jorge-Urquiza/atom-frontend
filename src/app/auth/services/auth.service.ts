import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { ApiResponse } from '../../shared/models/api-response';
import { LoginData } from '../models/login-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'http://localhost:5001/atom-challenge-6e114/us-central1/api/auth';
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginData>> {
    return this.http.post<ApiResponse<LoginData>>(`${this.apiUrl}/login`, loginRequest);
  }
}
