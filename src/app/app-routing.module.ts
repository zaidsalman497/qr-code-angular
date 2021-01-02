import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent,   },
{ path: 'signup', component: SignupComponent },
{ path: 'loggedin', component: LoggedinComponent },
{ path: 'admin-login', component: AdminLoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
