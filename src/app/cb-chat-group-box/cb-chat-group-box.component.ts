import { Component, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';;

@Component({
  selector: 'app-cb-chat-group-box',
  templateUrl: './cb-chat-group-box.component.html',
  styleUrls: ['./../cb-chat/cb-chat.component.css'],
})
export class CbChatGroupBoxComponent implements OnInit, OnChanges {

  @Input() public chatGroups: any[] = [];

  public selectedChatGroupId: any;

  public searchText!: string;

  @Output() public chatGroupSelectionChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.chatGroups?.length > 0 && !this.selectedChatGroupId)  {
      this.selectedChatGroupId = this.chatGroups[0].id;
      this.chatGroupSelectionChange.emit(this.selectedChatGroupId);
    }
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  public onSelectionChange(id: any): void {
    this.selectedChatGroupId = id;
    this.chatGroupSelectionChange.emit(this.selectedChatGroupId);
  }

  public matchesName(name: string) : boolean {
    if (!name || !this.searchText) {
      return true;
    }

    return name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;

  }

}
