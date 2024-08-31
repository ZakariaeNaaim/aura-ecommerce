import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = false;
  userProfile: User | null = null;
  private accessToken: string = '';
  private baseUrl = environment.apiUrl +'/api/auth';

  constructor(private http: HttpClient, private router: Router) {
    this.loadJwtTokenFromLocalStorage();
  }

  register(user: { username: string, email: string, password: string ,role:string[]}): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }


  public login(user: { username: string, email: string, password: string }): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    return this.http.post<{ 'token': string }>(`${this.baseUrl}/signin`, user, options).pipe(
      tap(data => {
        this.loadProfile(data['token']);
        this.router.navigate(["/"]);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  private loadProfile(token: string): void {
    this.accessToken = token;
    this.isAuthenticated = true;

    try {
      const decodedJwt: any = jwtDecode(this.accessToken);
      this.userProfile = {
        id: decodedJwt.userId,
        username: decodedJwt.userName,
        email: decodedJwt.email,
        roles: decodedJwt.roles,
        token: this.accessToken
      };

      localStorage.setItem("jwt-token", this.accessToken);
    } catch (e) {
      console.error('Error decoding token:', e);
      this.logout();
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.userProfile = null;
    localStorage.removeItem('jwt-token');
    this.router.navigateByUrl("/login");
  }

  private loadJwtTokenFromLocalStorage(): void {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      this.accessToken = token;
      this.isAuthenticated = true;

      try {
        const decodedJwt: any = jwtDecode(this.accessToken);
        this.userProfile = {
          id: decodedJwt.userId,
          username: decodedJwt.userName,
          email: decodedJwt.email,
          roles: decodedJwt.roles,
          token: this.accessToken
        };
      } catch (e) {
        console.error('Error decoding token from local storage:', e);
        this.logout();
      }
    } else {
      this.isAuthenticated = false;
    }
  }

  hasRole(role: string): boolean {
    return this.userProfile?.roles.includes(role) ?? false;
  }
}