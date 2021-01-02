import { Component, OnInit } from '@angular/core';
import { addScript } from 'src/utils/add-script';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    addScript('login');
    addScript('firebase');
  }

}
