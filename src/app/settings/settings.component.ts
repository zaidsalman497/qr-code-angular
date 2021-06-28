import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { userInfo } from 'os';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private router: Router | any

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  deleteaccount() {
    const user = firebase.default.auth().currentUser?.delete();
    (user as any).then(() => {
      console.log("we have deleted your account")
    }).catch((error: Error) => {
     console.log("sorry we couldn't delete your account")
    });
    return this.router.navigate(['login']);
  }

  signOut(): void {
    this.auth.signOut();
  }
}
  



