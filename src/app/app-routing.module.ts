import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login.component';
import { ApplicationDetailsComponent } from './applications/application-details.component';
import { ApplicationEditComponent } from './applications/application-edit.component'; 
import { ApplicationCreateComponent } from './applications/application-create.component'; 
import { SignUpComponent } from './auth/sign-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'applications', component: ApplicationDetailsComponent  },
  { path: 'applications/create', component: ApplicationCreateComponent  },
  { path: 'applications/edit', component: ApplicationEditComponent  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
