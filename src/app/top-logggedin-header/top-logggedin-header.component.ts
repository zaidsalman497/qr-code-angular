import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
declare var checkUser: any;

@Component({
  selector: 'app-top-logggedin-header',
  templateUrl: './top-logggedin-header.component.html',
  styleUrls: ['./top-logggedin-header.component.css']
})
export class TopLogggedinHeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    checkUser();
  }

  signOut(): void {
    this.authService.signOut();
  }

}
