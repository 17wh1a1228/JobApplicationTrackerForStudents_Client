import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../environment/environment';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { Student } from '../profile/students';
import { SignUp } from './sign-up';
import { LoginComponent } from './login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenKey: string = 'jwt-token';
  private currentStudentId!: number;

  private _authStatus = new Subject<boolean>();

  public authStatus = this._authStatus.asObservable();

  init(): void {
    if (this.isAuthenticated()) {
      this.setAuthStatus(true);
    }
  }

  setAuthStatus(isAuthenticated: boolean) {
    this._authStatus.next(isAuthenticated);
  }

  constructor(protected http: HttpClient) { }

  isAuthenticated() : boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(item: LoginRequest): Observable<LoginResult> {
      var url = environment.baseUrl + 'api/Account/Students';
      return this.http.post<LoginResult>(url, item)
      .pipe(tap((loginResult: LoginResult) => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.setAuthStatus(true);
        }
      }));  
    }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }

  signup(user: SignUp){
    var url = environment.baseUrl;
    return this.http.post(url + 'api/Account/Register', user);
  }

  getUserProfile(studentId: number): Observable<Student>{
    var url = environment.baseUrl + 'api/Account/Students/' + studentId; 
    return this.http.get<Student>(url);
  }

  setCurrentStudentId(studentId: number) {
    this.currentStudentId = studentId;
  }

  getCurrentStudentId(): number {
    return this.currentStudentId;
  }
}