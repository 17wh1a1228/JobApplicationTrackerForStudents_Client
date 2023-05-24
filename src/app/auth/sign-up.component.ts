import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SignUp } from './sign-up';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  userSubmitted!: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) { }
    
  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.signupForm = this.formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.maxLength(10)]],
      url: [null]
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.userSubmitted = true;
    if (this.signupForm.valid) {
      this.authService.signup(this.signupData()).subscribe(() => {
        this.router.navigate(["/login"]);
      });
    }
  }

  signupData(): SignUp {
    const formValues = this.signupForm.value;
    return {
      userName: formValues.userName,
      password: formValues.password,
      email: formValues.email,
      phone: formValues.phone,
      url: formValues.url
    };
  }
}
