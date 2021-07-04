import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public email!: string;
  public password!: string;
  public error!: any;

  constructor(private authService: AuthService, private msalservice: MsalService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  login() {
    this.msalservice.loginPopup().subscribe( ( Response: AuthenticationResult ) => {
      this.msalservice.instance.setActiveAccount(Response.account)
    } )
  }

  public async signIn(): Promise<void> {
    try {
      await this.authService.customSignIn(this.email, this.password);
    } catch (ex) {
      this.error = ex;
    }
  }
}
