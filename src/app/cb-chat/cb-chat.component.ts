import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { User } from '../services/user.model';

@Component({
  selector: 'app-cb-chat',
  templateUrl: './cb-chat.component.html',
  styleUrls: ['./cb-chat.component.css'],
 
})
export class CbChatComponent implements OnInit {


  public selectedChatId = 'HucDFkAoMS0pJLe2hpik';
  public chatTypingMsg!: string;
  public chatGroups$!: Observable<any>;
  public chat$!: Observable<any>;
  public currentUser!: User;

  constructor(public auth: AuthService, public cs: ChatService) {}

  ngOnInit(): void {
    this.chatGroups$ = this.cs.getUserChats();
    const source = this.cs.get(this.selectedChatId);
    this.chat$ = this.cs.joinUsers(source);
    this.auth.getUser().then( user => {
      this.currentUser = user;
    });
  }


  public submit(): void {
    if (!this.chatTypingMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(this.selectedChatId, this.chatTypingMsg);
    this.chatTypingMsg = '';
  }

}
