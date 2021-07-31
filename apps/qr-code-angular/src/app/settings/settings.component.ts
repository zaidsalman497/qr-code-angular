import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private router: Router | any
   settings = false
   loading = false
  constructor(public auth: AuthService, private msalservice: MsalService) { }

  ngOnInit(): void {
    this.loadingTimeout()
  }

  deleteaccount() {
    this.auth.delete()
  }

  signOut(): void {
    this.auth.signOut();
    this.msalservice.logout();
  }
  async loadingTimeout() {
    // var that = this;                           // no need of this line
this.loading = true;
this.settings = false

setTimeout(() => {      
      this.loading = false;
      this.settings = true
 }, 5000);
  }
}
  



