import { Component, OnInit } from '@angular/core';
declare var checkUser: any;
@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    checkUser();
  }


}
