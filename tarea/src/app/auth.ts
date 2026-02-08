import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
      
        localStorage.setItem('token', res.token);
        localStorage.setItem('ninja_rank', res.ninja.rank);
      })
    );
  }

  register(data: {username: string, password: string, rank: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('ninja_rank', res.ninja.rank);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('ninja_rank');
  }

  getRank(): string {
    return localStorage.getItem('ninja_rank') || 'Genin';
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}