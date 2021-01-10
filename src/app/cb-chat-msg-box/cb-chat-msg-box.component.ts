import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-cb-chat-msg-box',
  templateUrl: './cb-chat-msg-box.component.html',
  styleUrls: ['./../cb-chat/cb-chat.component.css'],

})
export class CbChatMsgBoxComponent implements OnInit {

  @Input() public messages: any[] = [];
  @Input() public currentUserId: any;
  @Input() public chatId: any;

  constructor(public cs: ChatService) { }

  ngOnInit(): void {
  }

  public trackByCreated(i: any, msg: any): any {
    return msg.createdAt;
  }

  public isCurrentUser(id: any): boolean {
    return this.currentUserId?.toString() === id?.toString();
  }

 public getDate(value: any): any {
    const date = new Date(value);
    return `${date?.toDateString()} ${date?.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`   || 'unknown';
  }
}
