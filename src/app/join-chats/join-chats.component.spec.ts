import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinChatsComponent } from './join-chats.component';

describe('JoinChatsComponent', () => {
  let component: JoinChatsComponent;
  let fixture: ComponentFixture<JoinChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
