import { CbChatComponent } from './cb-chat/cb-chat.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { LoggedinComponent } from './loggedin/loggedin.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChatCreateComponent } from './chat-create/chat-create.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { PaymentComponent } from './payment/payment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'home', component: HomeComponent },
{ path: 'login', component: LoginComponent},
{ path: 'loggedin', component: LoggedinComponent },
{ path: 'admin-login', component: AdminLoginComponent },
{ path: 'admin-users', component: AdminUsersComponent },
{ path: 'chat', component: CbChatComponent, canActivate: [AuthGuardService] },
{ path: 'create-chat', component: ChatCreateComponent, canActivate: [AuthGuardService]},
{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
{ path: 'animation', component: AboutMeComponent, canActivate: [AuthGuardService]},
{ path: 'payment', component: PaymentComponent},
{ path: '**', component: PageNotFoundComponent}]


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
