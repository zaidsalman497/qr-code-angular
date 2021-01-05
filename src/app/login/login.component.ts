import { Component, OnDestroy, OnInit } from '@angular/core';
import { addScript, removeScript } from 'src/utils/add-script';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    addScript('login');
    addScript('firebase');
    addScript('google');
    addScript('platform');
  }

  ngOnDestroy(): void {
    removeScript('login');
    removeScript('firebase');
    removeScript('google');
    removeScript('platform');
  }
}
