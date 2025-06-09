import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly TOKEN_KEY = 'token';
  private readonly EMAIL_KEY = 'email';

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  setEmail(email: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }
  getEmail(): string {
    return localStorage.getItem(this.EMAIL_KEY) ?? '';
  }
}
