import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CbChatComponent } from './cb-chat.component';

describe('CbChatComponent', () => {
  let component: CbChatComponent;
  let fixture: ComponentFixture<CbChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CbChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CbChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
