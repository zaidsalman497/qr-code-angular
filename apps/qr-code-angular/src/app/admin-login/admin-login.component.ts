import { addScript } from '../../utils/add-script';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    addScript('admin-login');
    addScript('admin-login-firebase');
  }

  ngOnDestroy(): void {
    removeScript('admin-login');
    removeScript('admin-login-firebase');
  }

}
