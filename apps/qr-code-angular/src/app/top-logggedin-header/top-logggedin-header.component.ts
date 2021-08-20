import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';
declare var checkUser: any;

@Component({
  selector: 'app-top-logggedin-header',
  templateUrl: './top-logggedin-header.component.html',
  styleUrls: ['./top-logggedin-header.component.css']
})
export class TopLogggedinHeaderComponent implements OnInit {

  constructor(public auth: AuthService, public msalservice: MsalService) { }

  ngOnInit(): void {
    checkUser();
  }

  signOut(): void {
    this.auth.signOut();
  }

}
