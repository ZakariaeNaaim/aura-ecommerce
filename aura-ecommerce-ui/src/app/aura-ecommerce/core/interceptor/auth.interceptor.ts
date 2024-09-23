import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private excludedUrls: string[] = ['/auth/signin', '/auth/signup']; 

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.excludedUrls.some(url => request.url.includes(url))) {
      return next.handle(request);
    }

    const token = localStorage.getItem("jwt-token");

    if (token) {
      const isTokenExpired = this.isTokenExpired(token);
      if (isTokenExpired) {
        this.router.navigate(['/auth/login']);
        return throwError(() => new Error('Token is expired'));
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigate(['/auth/access']);
        }
        return throwError(() => error);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return true;
    
    const expirationDate = new Date(exp * 1000);
    return expirationDate < new Date();
  }
}
