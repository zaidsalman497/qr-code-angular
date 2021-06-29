import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  deleteaccount() {
    this.auth.delete();
  }

  signOut(): void {
    this.auth.signOut();
  }
}
  



