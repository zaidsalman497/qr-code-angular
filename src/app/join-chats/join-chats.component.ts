import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-chats',
  templateUrl: './join-chats.component.html',
  styleUrls: ['./join-chats.component.css']
})
export class JoinChatsComponent implements OnInit {

  public id: any;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

  public onEnter(): void {
    this.chatService.enter(this.id);
  }
}
