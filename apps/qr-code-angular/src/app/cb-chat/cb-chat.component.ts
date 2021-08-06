import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { User } from '../services/user.model';

declare var checkUser: any;
@Component({
  selector: 'app-cb-chat',
  templateUrl: './cb-chat.component.html',
  styleUrls: ['./cb-chat.component.css'],
})
export class CbChatComponent implements OnInit {

  public chatTypingMsg!: string;
  chat = false;
  public chatGroups$!: Observable<any>;
  public chat$!: Observable<any>;
  public currentUser!: User;
  private selectedChatGroupId!: string;

  constructor(public auth: AuthService, public cs: ChatService) {}

  ngOnInit(): void {
    this.chatGroups$ = this.cs.getAllChats();
  }

  public onSelectedChatGroupChange(selectedChatId: any): void {
    this.selectedChatGroupId = selectedChatId;
    const source = this.cs.get(selectedChatId);
    this.chat$ = this.cs.joinUsers(source);
    this.auth.getUser().then((user) => {
      this.currentUser = user;
    });
  }

  public submit(): void {
    if (!this.chatTypingMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(this.selectedChatGroupId, this.chatTypingMsg);
    this.chatTypingMsg = '';
  }

  public deleteChatGroup(id: any): void {
    this.cs.deleteChatGroup(id);
  }
}
