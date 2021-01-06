import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLogggedinHeaderComponent } from './top-logggedin-header.component';

describe('TopLogggedinHeaderComponent', () => {
  let component: TopLogggedinHeaderComponent;
  let fixture: ComponentFixture<TopLogggedinHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLogggedinHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLogggedinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
