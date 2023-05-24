import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from './application.service';
import { Router } from "@angular/router";
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent implements OnInit {

  applicationForm!: FormGroup;
  loggedInStudentId: any;
  student: any;
  submitted: boolean = false;
  loading: boolean = false;
  status = [
    { id: 1, name: "Applied"},
    { id: 2, name: "In Progress"},
    { id: 3, name: "Interviewed"},
    { id: 4, name: "Hired"},
    { id: 5, name: "Rejected"},
  ]

  constructor(
    private http: HttpClient,
    private applicationService: ApplicationService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) {
      this.applicationForm = this.formBuilder.group({
        position: ['', Validators.required],
        company: ['', Validators.required],
        date: ['', Validators.required],
        studentDto: this.formBuilder.group({
          studentId: ['']
        })
      })
     }

  ngOnInit(): void {
    let userId = this.authService.getCurrentStudentId();
    this.loggedInStudentId = userId ? userId : "";
    this.student = {};

    this.authService.getUserProfile(this.loggedInStudentId).subscribe(
      (response) => {
        this.student = response;
        console.log("Student Details: " + this.student.studentId);
        this.applicationForm.get('studentDto')?.get('studentId')?.setValue(this.student.studentId);
      },
      (error) => {
        console.error(error);
      })
  }

  onSubmit() {
    this.submitted = true;
    if(this.applicationForm.invalid) {
      return;
    }
    
    this.loading = true;

    this.applicationService.addApplication(this.applicationForm.value)
      .subscribe(() => {
        this.router.navigate(['/applications'])
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
      );
  }

  goToApplications() {
    this.router.navigate(['/applications']); 
  }
}
