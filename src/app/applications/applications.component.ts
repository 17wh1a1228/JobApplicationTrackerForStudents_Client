import { Component } from '@angular/core';
// import { Applications } from './applications';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { error } from 'console';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent {
  public applications: Applications[] = [];

  constructor(http: HttpClient) {
    http.get<Applications[]>(environment.baseUrl + 'api/Applications').subscribe(result => {
      this.applications = result;
    }, error => console.error(error));
  }
}
