import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { ApiResponse } from '../../shared/models/api-response';
import { LoginData } from '../models/login-data';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient) {}

  public login(loginRequest: LoginRequest): Observable<ApiResponse<LoginData>> {
    return this.http.post<ApiResponse<LoginData>>(
      `${this.apiUrl}/login`,
      loginRequest
    );
  }
}
