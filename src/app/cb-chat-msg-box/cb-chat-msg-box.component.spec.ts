import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbChatMsgBoxComponent } from './cb-chat-msg-box.component';

describe('CbChatMsgBoxComponent', () => {
  let component: CbChatMsgBoxComponent;
  let fixture: ComponentFixture<CbChatMsgBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbChatMsgBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbChatMsgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
