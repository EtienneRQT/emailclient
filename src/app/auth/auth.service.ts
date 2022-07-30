import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<ValidationErrors | null> {
    return this.http.post<any>('https://api.angular-email.com/auth/username', {
      username,
    });
  }
}
