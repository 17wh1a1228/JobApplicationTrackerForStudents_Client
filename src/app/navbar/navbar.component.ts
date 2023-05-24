import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  private destroySubject = new Subject();
  loggedinUser!: string;

  constructor(private authService: AuthService,  private router: Router) {
    this.authService.authStatus
    .pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.isLoggedIn = result;
    },
    error => {
      console.error('Error during authentication:', error);
    });
  }

  loggedin() {
    this.loggedinUser = localStorage.getItem('username') || '';
    return this.loggedinUser;
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

}
