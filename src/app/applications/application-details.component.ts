import { Component, OnInit } from '@angular/core';
import { Application } from '../models/applications';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from './application.service';
@Component({
  selector: 'app-applications',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})

export class ApplicationDetailsComponent implements OnInit{
  applications: Application[] = [];
  posittion = '';
  company = '';
  date = new Date();
  statusId = '';
  studentId!: '';
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private applicationService: ApplicationService
    ) { }

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(
      appl=>{
        this.applications = appl;
        console.log(appl);
      }, error => {
        console.log('httperror');
        console.log(error);
      }
    );
    // this.fetchApplications();
  }

  // fetchApplications() {
  //   let url = environment.baseUrl + 'api/applications';
  //   this.http.get<Application[]>(url).subscribe(result => {
  //     this.applications = result;
  //   });
  // }

  // deleteApplication(jobId: number){
  //   let url = environment.baseUrl + 'api/applications' + jobId;
  //   this.http.delete<Application[]>(url).subscribe(() => {
  //     this.fetchApplications();
  //   })
  // }


  goToCreateApplication() {
    this.router.navigate(['/applications/create']);
    // let listing = this.router.navigate(['/create']);
    // console.log(listing)
    // let url = environment.baseUrl + 'api/Applications'
    // this.http.post(url, {}).subscribe(() => {
    // });
  }
}