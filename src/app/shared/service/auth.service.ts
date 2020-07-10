import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {FbAuthRespons, User} from '../interfaces/user.interface';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private http: HttpClient,
  ) { }
  get token(): string{
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logOut();
      return null;
    }
    return localStorage.getItem('fb-token');
  }
  isLogin(): boolean{
    return !!this.token;
  }
  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }
  private handleError(error: HttpErrorResponse) {
  const {message} = error.error.error;
  switch (message) {
    case 'INVALID_EMAIL':
      this.error$.next('Невірний Електроний Адрес');
      break;
    case 'INVALID_PASSWORD':
      this.error$.next('Невірний Пароль');
      break;
    case 'EMAIL_NOT_FOUND':
      this.error$.next('Некоректний Емейл');
      break;
  }
  return throwError(error);
  }
  logOut() {
    this.setToken(null);
  }

  private setToken(response: FbAuthRespons | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}