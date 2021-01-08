import { JoinChatsComponent } from './join-chats/join-chats.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChatHomeComponent } from './chat-home/chat-home.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent,   },
{ path: 'signup', component: SignupComponent },
{ path: 'loggedin', component: LoggedinComponent },
{ path: 'admin-login', component: AdminLoginComponent },
{ path: 'admin-users', component: AdminUsersComponent },
{ path: 'chat', component: ChatHomeComponent },
{ path: 'chats/:id', component: ChatComponent, canActivate: [AuthGuardService] },
{ path: 'joinchat', component: JoinChatsComponent, canActivate: [AuthGuardService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
