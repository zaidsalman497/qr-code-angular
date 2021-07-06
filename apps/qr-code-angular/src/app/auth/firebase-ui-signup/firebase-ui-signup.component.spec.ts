import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseUiSignupComponent } from './firebase-ui-signup.component';

describe('FirebaseUiSignupComponent', () => {
  let component: FirebaseUiSignupComponent;
  let fixture: ComponentFixture<FirebaseUiSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirebaseUiSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseUiSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
