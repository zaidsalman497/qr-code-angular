import { Stripe } from 'stripe';

import { Injectable, OnInit } from '@angular/core';
import { FireStoreService } from '../services/firestore.service';
import { AuthService } from '../services/auth.service';
declare var stripe: Promise<Stripe>;
@Injectable({
  providedIn: 'root',
})
export class PaymentService implements OnInit {
  confirmation = false
  constructor(private fs: FireStoreService, private auth: AuthService) {}
  ngOnInit() {
  }
}