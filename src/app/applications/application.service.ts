import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Application } from '../models/applications';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl + 'api/Applications');
  }

  getApplication(jobId: number): Observable<Application | any> {
    return this.getAllApplications().pipe(
      map(applicationsList => {
        return applicationsList.find(a => a.jobId === jobId);
      })
    );
  }

  addApplication(application: Application): Observable<any> {
      let url = this.baseUrl + 'api/Applications';
      return this.http.post(url, application);
  }

  updateApplication(jobId: number, application: Application) {
    let url = this.baseUrl + 'api/Applications' + jobId;
    return this.http.put(url, application);
  }
  deleteApplication(jobId: number): Observable<any> {
    let url = this.baseUrl + 'api/Applications' + jobId;
    return this.http.delete(url);
  }
}
