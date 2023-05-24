import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from './login-request';
import { LoginResult } from './login-result';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../profile/students';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  loginResult!: LoginResult;
  currentStudentId!: number;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      userName: new UntypedFormControl("", Validators.required),
      password: new UntypedFormControl("", Validators.required)
    });
  }

  onSubmit() {
    var loginRequest = <LoginRequest>{
      userName: this.form.controls['userName'].value,
      password: this.form.controls['password'].value
    };
    this.authService.login(loginRequest).subscribe({
      next: result => {
        console.log(result);
        this.loginResult = result;
        if (result.success) {
          localStorage.setItem(this.authService.tokenKey, result.token);
          this.authService.getUserProfile(this.currentStudentId).subscribe((student: Student) => {
            this.currentStudentId = student.id; 
            console.log('Current logged-in student ID:', this.currentStudentId);
            this.authService.setCurrentStudentId(this.currentStudentId); 
            this.router.navigate(["/"]);
          }, (error: any) => {
            console.log('Error retrieving user profile:', error);
            this.router.navigate(["/"]);
          });        }
      },
      error: error => {
        console.log(error);
        if (error.status == 401) {
          loginRequest = error.error;
        }
    }});
  }

}