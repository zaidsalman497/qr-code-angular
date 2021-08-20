import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  constructor(public auth: AuthService, private afAuth: AngularFireAuth, ) { }

  ngOnInit(): void {
  }

}
