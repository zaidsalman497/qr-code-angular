import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwiterComponent } from './twiter.component';

describe('TwiterComponent', () => {
  let component: TwiterComponent;
  let fixture: ComponentFixture<TwiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwiterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
