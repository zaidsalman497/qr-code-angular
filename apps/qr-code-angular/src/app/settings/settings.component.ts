import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  private router: Router | any;

  constructor(public auth: AuthService, private msalservice: MsalService) {}

  ngOnInit(): void {}

  deleteaccount() {
    this.auth.delete();
  }

  signOut(): void {
    this.auth.signOut();
  }
}
