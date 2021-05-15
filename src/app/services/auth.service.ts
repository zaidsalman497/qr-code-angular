import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { EmailValidator } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';


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
  async customSignIn(
    email: any,
    password: any
  ): Promise<void> {
    const credentials = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    const result = await this.afAuth.signInWithCredential(credentials);
    setCookeeValue('loggedInUser', email, 2);
    setCookeeValue('loggedInUserName', result.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', './assets/img/unknown.png', 2);
    await this.updateUserData(result.user as User);
    this.router.navigate(['loggedin']);
  }

  async customSignUp(
    displayName: string,
    email: any,
    password: any,
    phoneNumber: any
  ): Promise<void> {
    const result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password,
    );
    const rs = await this.afAuth.currentUser;
    await rs?.updateProfile({
      displayName,
      photoURL: './assets/img/unknown.png',
    });
     
      
      const appVerifier =  (window as any).recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        (window as any).confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error)      });

        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      (window as any).confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      console.log(error)
    });

    
    setCookeeValue('loggedInUser', email, 2);
    setCookeeValue('loggedInUserName', displayName, 2);
    setCookeeValue('loggedInUserImgUrl', './assets/img/unknown.png', 2);
  }
  async TwiterSignIn(): Promise<void> {
    const provider = new firebase.auth.TwitterAuthProvider();
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

  async googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    setCookeeValue('loggedInUser', credential.user?.email, 2);
    setCookeeValue('loggedInUserName', credential.user?.displayName, 2);
    setCookeeValue('loggedInUserImgUrl', credential.user?.photoURL, 2);
    await this.updateUserData(credential.user as User);
    this.router.navigate(['loggedin']);
  }

  async signOut(): Promise<boolean> {
    await this.afAuth.signOut();
    setCookeeValue('loggedInUser', '', 2);
    setCookeeValue('loggedInUserName', '', 2);
    setCookeeValue('loggedInUserImgUrl', '', 2);
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

