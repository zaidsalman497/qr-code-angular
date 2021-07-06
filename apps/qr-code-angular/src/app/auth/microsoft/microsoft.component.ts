import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-microsoft',
  templateUrl: './microsoft.component.html',
  styleUrls: ['./microsoft.component.css']
})
export class MicrosoftComponent implements OnInit {

  constructor(public auth: AuthService, public msalservice: MsalService) {}

  ngOnInit(): void {
     this.auth.signOut();
  }

  login() {
    this.msalservice.loginPopup().subscribe( ( Response: AuthenticationResult ) => {
      this.msalservice.instance.setActiveAccount(Response.account)
    } )
  }

   logout() {
     this.msalservice.instance.logoutRedirect();
   }

}
