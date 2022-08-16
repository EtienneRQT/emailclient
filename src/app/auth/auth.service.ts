import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SignInResponse {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com/';
  public signedIn$ = new BehaviorSubject<boolean | null>(null);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<ValidationErrors | null> {
    return this.http.post<Observable<ValidationErrors | null>>(
      `${this.baseUrl}auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.http
      .post<SignupResponse>(`${this.baseUrl}auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkAuth(): Observable<SignedInResponse> {
    return this.http.get<SignedInResponse>(`${this.baseUrl}auth/signedin`).pipe(
      tap(({ authenticated }) => {
        this.signedIn$.next(authenticated);
      })
    );
  }

  signout(): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    );
  }

  signin(value: SigninCredentials): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(`${this.baseUrl}auth/signin`, value)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }
}
