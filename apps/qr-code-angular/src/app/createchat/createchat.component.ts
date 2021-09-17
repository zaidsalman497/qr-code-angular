import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-createchat',
  templateUrl: './createchat.component.html',
  styleUrls: ['./createchat.component.css']
})
export class CreatechatComponent implements OnInit {

  constructor(public cs: ChatService) { }

  ngOnInit(): void {
  }

  createchat() {
    this.cs.privatechat('uid-user')
  }

}
