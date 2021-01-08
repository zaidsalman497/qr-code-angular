import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  public userChats$!: Observable<any>;
  constructor(public auth: AuthService, public cs: ChatService) {}

  ngOnInit(): void {
    this.userChats$ = this.cs.getUserChats();
  }

}
