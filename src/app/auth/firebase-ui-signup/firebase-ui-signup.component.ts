import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';

@Component({
  selector: 'app-firebase-ui-signup',
  templateUrl: './firebase-ui-signup.component.html',
  styleUrls: ['./firebase-ui-signup.component.css'],
})
export class FirebaseUiSignupComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  successCallback(
    signInSuccessData: FirebaseUISignInSuccessWithAuthResult
  ): void {
    this.authService.onSuccessLogin(
      signInSuccessData.authResult.user?.email,
      signInSuccessData.authResult.user?.displayName,
      signInSuccessData.authResult.user,
      signInSuccessData.authResult.user?.photoURL
    );
  }

  errorCallback(errorData: FirebaseUISignInFailure): void {
    console.error('FirebaseUiSignupComponent>errorCallback', errorData);
  }

  uiShownCallback(): void {
    console.log('FirebaseUiSignupComponent>uiShownCallback');
  }
}
