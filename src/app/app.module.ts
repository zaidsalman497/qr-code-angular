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
import { environment } from 'src/environments/environment';
import { GoogleComponent } from './auth/google/google.component';
import { TopLogggedinHeaderComponent } from './top-logggedin-header/top-logggedin-header.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { JoinChatsComponent } from './join-chats/join-chats.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatCreateComponent } from './chat-create/chat-create.component';
import { SelectImgComponent } from './utils/select-img/select-img.component';
import { CbChatComponent } from './cb-chat/cb-chat.component';
import { CbChatMsgBoxComponent } from './cb-chat-msg-box/cb-chat-msg-box.component';
import { CbChatGroupBoxComponent } from './cb-chat-group-box/cb-chat-group-box.component';


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
    ChatComponent,
    ChatHomeComponent,
    JoinChatsComponent,
    ChatroomComponent,
    ChatCreateComponent,
    SelectImgComponent,
    CbChatComponent,
    CbChatMsgBoxComponent,
    CbChatGroupBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
