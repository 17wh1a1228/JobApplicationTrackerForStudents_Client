import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationService } from './application.service';
import { Application } from '../models/applications';


@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent implements OnInit {
  updateApplicationForm!: FormGroup;
  application!: Application;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.generateForm();
    const jobIdParam = this.route.snapshot.paramMap.get('jobId');
    if (jobIdParam !== null) {
      const jobId = Number(jobIdParam);
      this.fetchValues(jobId);
    }
  }

  generateForm() {
    this.updateApplicationForm = this.formBuilder.group({
      position: '',
      company: '',
      date: new FormControl(new Date()),
      status: ''
    })
  }

  fetchValues(jobId: number) {
    this.applicationService.getApplication(jobId).subscribe(appl => {
      this.application = appl;
      if (this.updateApplicationForm && this.application) {
        this.updateApplicationForm.get('position')?.setValue(this.application.position);
        this.updateApplicationForm.get('company')?.setValue(this.application.company);
        this.updateApplicationForm.get('status')?.setValue(this.application.status);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateApplicationForm.invalid || !this.application) {
      return;
    }

    this.loading = true;

    const jobId = this.application.jobId; // Perform null check
    this.applicationService.updateApplication(jobId, this.updateApplicationForm.value)
      .subscribe(() => {
        this.router.navigate(['/applications']);
      });
  }
}
