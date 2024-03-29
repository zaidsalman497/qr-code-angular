import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firebase, firebaseui } from 'firebaseui-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { first, map, switchMap, take, tap } from 'rxjs/operators';
import { User } from './user.model';
import { EmailValidator } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { SignupComponent } from '../signup/signup.component';
import { FirebaseApp, FIREBASE_OPTIONS } from '@angular/fire';
import { error } from 'protractor';
import { settings } from 'cluster';
import { auth } from 'firebaseui';
declare var setCookeeValue: any;

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User>;



  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      map((c) => c as User)
    );
  }

  public getUser(): Promise<User> {
    return this.user$.pipe(first()).toPromise();
  }
  async customSignIn(email: any, password: any): Promise<void> {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    const result = await this.afAuth.signInWithCredential(credentials);

    this.onSuccessLogin(email, result.user?.displayName, result.user);
  }

  async customSignUp(
    displayName: string,
    email: any,
    _password: any,
    phoneNumber: string
  ): Promise<void> {
    try {
      const appVerifier = (window as any).recaptchaVerifier;
      const rs = await this.afAuth.currentUser;
      await rs?.updateProfile({
        displayName,
        photoURL: './assets/img/unknown.png',
      });

      const a = firebase.auth.RecaptchaVerifier_Instance;
      const phoneProvider = new firebase.auth.PhoneAuthProvider();

      const phoneVerResult = await phoneProvider.verifyPhoneNumber(phoneNumber, appVerifier);
      console.log('result==>', phoneVerResult);

      this.onSuccessLogin(email, displayName, null);

    } catch (ex) {
      console.error('im catch block', ex);
    }

  }

  async onSuccessLogin(email: any, displayName: any, user?: any, photoURL?: any, phonenumber?: any): Promise<void> {
    setCookeeValue('loggedInUser', email, 2);
    setCookeeValue('loggedInUserName', displayName ||  'Guest' ,2);
    setCookeeValue('loggedInUserImgUrl', photoURL || './assets/img/unknown.png', 2);
    if (user) {
      await this.updateUserData(user);
  
    } 
    this.router.navigate(['loggedin']);
  }

  async TwiterSignIn(): Promise<void> {
    const provider = new firebase.auth.TwitterAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.onSuccessLogin(credential.user?.email, credential.user?.displayName, credential.user, credential.user?.photoURL);
  }

  async phoneSignIn(): Promise<void> {
    const provider = new firebase.auth.PhoneAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    setCookeeValue('loggedInUser', credential.user?.email, 2);
    setCookeeValue('loggedInUserName', credential.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', credential.user?.photoURL, 2);
    await this.updateUserData(credential.user as User);
    this.router.navigate(['loggedin']);
  }

  async FacebookSignIn(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    setCookeeValue('loggedInUser', credential.user?.email, 2);
    setCookeeValue('loggedInUserName', credential.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', credential.user?.photoURL, 2);
    await this.updateUserData(credential.user as User);
    this.router.navigate(['loggedin']);
  }

  async githubSignIn(): Promise<void> {
    const provider = new firebase.auth.GithubAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    setCookeeValue('loggedInUser', credential.user?.email, 2);
    setCookeeValue('loggedInUserName', credential.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', credential.user?.photoURL, 2);
    await this.updateUserData(credential.user as User);
    this.router.navigate(['loggedin']);
  }

  async recaper() {
    const appVerifier = (window as any).recaptchaVerifier
    const provider = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    provider.render() 
  }

  async googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    setCookeeValue('loggedInUser', credential.user?.email, 2);
    setCookeeValue('loggedInUserName', credential.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', credential.user?.photoURL, 2);
    await this.updateUserData(credential.user as User);
    this.router.navigate(['loggedin']);
  }

  async microsoftSignIn(): Promise<void> {
    const provider = new firebase.auth.OAuthProvider('microsoft.com');
    const credential = await this.afAuth.signInWithPopup(provider);
    setCookeeValue('loggedInUser', credential.user?.email, 2);
    setCookeeValue('loggedInUserName', credential.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', credential.user?.photoURL, 2);
    await this.updateUserData(credential.user as User);
    this.router.navigate(['loggedin']);
  }

   async delete() {
    const user = firebase.auth().currentUser;
    (user as any).delete().then(() => {
      console.log("we have deleted your account")
    }).catch((error: any) => {
      alert("We couldn't delete your account")
    });
    return this.router.navigate(['login']);
  }

  async signOut(): Promise<boolean> {
    await this.afAuth.signOut();
    setCookeeValue('loggedInUser', '', 0);
    setCookeeValue('loggedInUserName', '', 0);
    setCookeeValue('loggedInUserImgUrl', '', 0);
    return this.router.navigate(['login']);
  }

  private updateUserData(user: User): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
function onSignInSubmit() {
  throw new Error('Function not implemented.');
}
