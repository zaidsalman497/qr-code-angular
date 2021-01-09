import { Component, OnInit } from '@angular/core';
declare var checkUser: any;
@Component({
  selector: 'app-top-logggedin-header',
  templateUrl: './top-logggedin-header.component.html',
  styleUrls: ['./top-logggedin-header.component.css']
})
export class TopLogggedinHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    checkUser();
  }

}
