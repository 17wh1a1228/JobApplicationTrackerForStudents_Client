import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ApplicationDetailsComponent } from './applications/application-details.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './auth/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApplicationEditComponent } from './applications/application-edit.component';
import { ApplicationCreateComponent } from './applications/application-create.component';
import { AuthModule } from '@auth0/auth0-angular';
import { SignUpComponent } from './auth/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ApplicationDetailsComponent,
    ProfileComponent,
    LoginComponent,
    ApplicationEditComponent,
    ApplicationCreateComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-4b27lpg0p0xrstrh.us.auth0.com',
      clientId: 'BARUP9hdQRCwtRKF5oj4Ehdwd7vJFxv2',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
