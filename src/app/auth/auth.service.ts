import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com/';

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<ValidationErrors | null> {
    return this.http.post<Observable<ValidationErrors | null>>(
      `${this.baseUrl}auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(
      `${this.baseUrl}auth/signup`,
      credentials
    );
  }
}
