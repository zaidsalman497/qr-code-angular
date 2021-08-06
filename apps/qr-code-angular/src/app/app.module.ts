import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedinComponent } from './loggedin/loggedin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { GoogleComponent } from './auth/google/google.component';
import { TopLogggedinHeaderComponent } from './top-logggedin-header/top-logggedin-header.component';
import { FormsModule } from '@angular/forms';
import { ChatCreateComponent } from './chat-create/chat-create.component';
import { SelectImgComponent } from './utils/select-img/select-img.component';
import { CbChatComponent } from './cb-chat/cb-chat.component';
import { CbChatMsgBoxComponent } from './cb-chat-msg-box/cb-chat-msg-box.component';
import { CbChatGroupBoxComponent } from './cb-chat-group-box/cb-chat-group-box.component';
import { GithubComponent } from './auth/github/github.component';
import { FacebookComponent } from './auth/facebook/facebook.component';
import { TwiterComponent } from './auth/twiter/twiter.component';
import { FirebaseUiSignupComponent } from './auth/firebase-ui-signup/firebase-ui-signup.component';
import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { SettingsComponent } from './settings/settings.component';
import { MicrosoftComponent } from './auth/microsoft/microsoft.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { PaymentComponent } from './payment/payment.component';
import { LoadingComponent } from './loading/loading.component';
import { FireStoreService } from './services/firestore.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoursesComponent } from './courses/courses.component';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    new firebase.auth.OAuthProvider("microsoft.com").providerId,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    },
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

export function MSALInstanceFactory(): IPublicClientApplication { 
  return new PublicClientApplication({
    auth: {
      clientId: '4ea8fc40-87dd-4f16-8644-ef90823b8e90',
      redirectUri: 'http://localhost:4200/loggedin',
    }
  })
}
  
    

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LoggedinComponent,
    AdminLoginComponent,
    AdminUsersComponent,
    TopHeaderComponent,
    GoogleComponent,
    TopLogggedinHeaderComponent,
    ChatCreateComponent,
    SelectImgComponent,
    CbChatComponent,
    CbChatMsgBoxComponent,
    CbChatGroupBoxComponent,
    GithubComponent,
    FacebookComponent,
    TwiterComponent,
    FirebaseUiSignupComponent,
    SettingsComponent,
    MicrosoftComponent,
    AboutMeComponent,
    PaymentComponent,
    LoadingComponent,
    PageNotFoundComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FormsModule,
    MsalModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService,
    FireStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
