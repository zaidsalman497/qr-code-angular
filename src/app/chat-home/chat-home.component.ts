import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {
  public userChats$!: Observable<any>;
  constructor(public auth: AuthService, public cs: ChatService) {}

  ngOnInit() {
    this.userChats$ = this.cs.getUserChats();
  }

}
