import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

declare var iconSelect: any;

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css'],
})
export class ChatCreateComponent implements OnInit {
  createchat = false;
  public chatRoomName = '';

  constructor(public cs: ChatService) {}

  ngOnInit(): void {
  }

  public createChat(): void {
    this.cs.create(this.chatRoomName, iconSelect.getSelectedFilePath());
  }


}
