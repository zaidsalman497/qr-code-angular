import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';


declare var iconSelect: any;

@Component({
  selector: 'app-chat-create',
  templateUrl: './chat-create.component.html',
  styleUrls: ['./chat-create.component.css']
})
export class ChatCreateComponent implements OnInit {
   
  createchat = false
  loading = false
  public chatRoomName = '';

  constructor(public cs: ChatService) { }

  ngOnInit(): void {
    this.loadingTimeout()
  }

  public createChat(): void {
    this.cs.create(this.chatRoomName, iconSelect.getSelectedFilePath());
  }

  async loadingTimeout() {
    // var that = this;                           // no need of this line
this.loading = true;
this.createchat = false

setTimeout(() => {      
      this.loading = false;
      this.createchat = true
 }, 5000);
  }

}
