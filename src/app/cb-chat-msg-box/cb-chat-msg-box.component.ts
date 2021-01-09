import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cb-chat-msg-box',
  templateUrl: './cb-chat-msg-box.component.html',
  styleUrls: ['./../cb-chat/cb-chat.component.css'],
  
})
export class CbChatMsgBoxComponent implements OnInit {

  @Input() public messages: any[] = [];
  @Input() public currentUserId: any;

  constructor() { }

  ngOnInit(): void {
  }

  public trackByCreated(i: any, msg: any): any {
    return msg.createdAt;
  }

  public isCurrentUser(id: any): boolean {
    return this.currentUserId == id;
  }
}
