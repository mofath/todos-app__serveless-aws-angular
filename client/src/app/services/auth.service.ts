import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginData: { username: string; password: string }) {
    const url = 'https://n3528wo07c.execute-api.us-east-1.amazonaws.com/dev/auth';

    return this.http.post<any>(url, loginData);
  }

  setAuthToken(authenticationToken: string) {
    localStorage.setItem("token", authenticationToken)
  }

  getAuthToken() : string {
    return localStorage.getItem("token") as string
  }

  isLoggedIn() : boolean {
    const token = this.getAuthToken()
    return token !== undefined && token !== null && token.length > 0
  }
}
