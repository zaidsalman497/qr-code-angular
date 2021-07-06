import { User } from './user.model';
import { promise } from 'protractor';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router, RouterLink } from '@angular/router';
import firebase from 'firebase';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { AnyARecord } from 'dns';
import { link } from 'fs';
import { makeBindingParser } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) {}

  public get(chatId: any): Observable<any> {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  public getUserChats(): Observable<any> {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('chats', ref => ref.where('uid', '==', user.uid))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: any = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }

  public getAllChats(): Observable<any> {
    return this.afs
    .collection('chats')
    .snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public async create(name?: string, iconPath?: string): Promise<boolean> {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      name,
      iconPath,
      createdAt: new Date().toISOString(),
      count: 0,
      messages: []
    };

    const docRef = await this.afs.collection('chats').add(data);

    return this.router.navigate(['chat']);
  }

  public async sendMessage(chatId: any, content: any): Promise<void> {
    const { uid } = await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt: new Date().toISOString()
    };

    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        messages: firebase.firestore.FieldValue.arrayUnion(data)
      });
    }
  }

  public async deleteMessage(id: any, msg: any): Promise<void> {
    const { uid } = await this.auth.getUser();

    const ref = this.afs.collection('chats').doc(id);
    console.log(msg);
    if (id === uid || msg.uid === uid) {
      // Allowed to delete
      delete msg.user;
      return ref.update({
        messages: firebase.firestore.FieldValue.arrayRemove(msg)
      });
    }
  }

  public async deleteChatGroup(id: any): Promise<void> {
     this.afs.collection('chats').doc(id).delete().then(() => {
        window.location.reload();
     });
  }

  public joinUsers(chat$: Observable<any>): Observable<any> {
    let chat: any;
    const joinKeys: any = {};

    return chat$.pipe(
      switchMap(c => {
        // Unique User IDs
        chat = c;
        const uids = Array.from(new Set(c.messages.map((v: any) => v.uid)));

        // Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`users/${u}`).valueChanges()
        );

        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach((v: any) => joinKeys[v.uid] = v);
        chat.messages = chat.messages.map((v: any) => {
          return { ...v, user: joinKeys[v.uid] };
        });

        return chat;
      })
    );
  }

  public async enter(uid: any): Promise<void> {
    if (uid === undefined) {
      alert('id does not exites');
    } else {
      window.location.href = '/chats/' + uid;
    }
  }
}
