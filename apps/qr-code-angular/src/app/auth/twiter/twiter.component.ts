import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-twiter',
  templateUrl: './twiter.component.html',
  styleUrls: ['./twiter.component.css']
})
export class TwiterComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
  }

}
