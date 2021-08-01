import { Stripe } from 'stripe';

import { Injectable } from '@angular/core';
import { FireStoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
declare var stripe: Promise<Stripe>;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private fs: FireStoreService, private auth: AuthService) {}
  async pro() {
    this.fs.removeFromFirestore('unpaidusers', (await this.auth.getUser()).uid)
    this.fs.getFromFirestore('paidusers', (await this.auth.getUser()).uid)
    this.fs.saveToFirestore('unpaidusers', (await this.auth.getUser()).uid, {displayName: (await this.auth.getUser()).displayName, email: (await this.auth.getUser()).email, photoUrl: (await this.auth.getUser()).photoURL, uid: (await this.auth.getUser()).uid, subcription: 'active'})
  }

  async basic() {
    this.fs.getFromFirestore('unpaidusers', (await this.auth.getUser()).uid)
    this.fs.saveToFirestore('unpaidusers', (await this.auth.getUser()).uid, {displayName: (await this.auth.getUser()).displayName, email: (await this.auth.getUser()).email, photoUrl: (await this.auth.getUser()).photoURL, uid: (await this.auth.getUser()).uid, subcription: 'not active'})
}
}