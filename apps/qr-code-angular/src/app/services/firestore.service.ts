import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { PaymentService } from '../payment/payment.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
  constructor(private auth: AuthService, private db: AngularFirestore) {}
  confirmation = false

  saveToFirestore(collectionName: string, docName: string, data: any): void {
    this.db.collection(collectionName).doc(docName).set(data).then((obj) => {
     console.log('saveToFirestore-result', obj);
   });
 }

 getFromFirestore(collectionName: string, name: string): Observable<any> {
   const ref =  this.db.collection(collectionName).doc(name);
   return from(ref.get());
 }

 removeFromFirestore(collectionName: string, name: string): void {
   this.db
     .collection(collectionName)
     .doc(name)
     .delete()
     .then((obj) => {
       console.log('remove-result', obj);
     });
 }

ngOnInit() {
}

}
