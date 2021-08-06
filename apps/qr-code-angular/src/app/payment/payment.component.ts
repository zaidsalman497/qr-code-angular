import { from, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { User } from '../services/user.model';
import { FireStoreService } from '../services/firestore.service';
import { userInfo } from 'os';
import { PaymentService } from './payment.service';
import { BasicDepthPacking } from 'three';
// tslint:disable-next-line: no-unused-expression
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  constructor(
    private auth: AuthService,
    private fs: FireStoreService,
    private payment: PaymentService
  ) {}
  stripePromise = loadStripe(environment.stripe.stripekey);
  confirmation: any = false;
  notconfirmed = false;
  nothing = false;
  loading = false;
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  clientSecret!: any;
  fail!: StripeError;
  error!: StripeError;
  async checkout(): Promise<void> {
    const stripe = await this.stripePromise;
    this.loading = true;
    const error = stripe?.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: this.priceId, quantity: 1 }],
      successUrl: 'http://localhost:4200/payment?my-status=done',
      cancelUrl: 'http://localhost:4200/payment?my-status=reject',
    });
    console.log('checkout-2-status');
    return this.status();
  }
  async status(): Promise<void> {
    this.fs.saveToFirestore('paymentInProgress', 'userId', {
      displayname: (await this.auth.getUser()).displayName,
    });
  }
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.paiduser();
    this.fs
      .getFromFirestore('paymentInProgress', 'userId')
      .subscribe(async (obj) => {
        if (urlParams.get('my-status') === 'done' && obj?.exists) {
          this.fs.saveToFirestore('paid', 'subcription', {
            email: (await this.auth.getUser()).email,
            Active: 'active',
            displayName: (await this.auth.getUser()).displayName,
          });
          this.fs.removeFromFirestore('unpaid', 'nosubcription');
          this.fs.saveToFirestore('paid', 'subcription', {
            email: (await this.auth.getUser()).email,
            Active: 'active',
            displayName: (await this.auth.getUser()).displayName,
          });
          this.getUser().subscribe(async (user) => {
            this.fs.saveToFirestore('paid', 'subcription', {
              email: user.email,
              Active: 'active',
              displayName: user.displayName,
            });
            this.fs.removeFromFirestore('unpaid', 'nosubcription');
            this.fs.saveToFirestore('paid', 'subcription', {
              email: (await this.auth.getUser()).email,
              Active: 'active',
              displayName: (await this.auth.getUser()).displayName,
            });
            this.fs.removeFromFirestore('paymentInProgress', 'userId');
            // tslint:disable-next-line: no-unused-expression
            this.pro();
          });
        } else if (urlParams.get('my-status') === 'reject' && obj?.exists) {
          this.fs.removeFromFirestore('paymentInProgress', 'userId');
          this.fs.removeFromFirestore('paid', 'subcription');
          // tslint:disable-next-line: no-unused-expression
          this.basic();
        }
      });
  }

  async back(): Promise<void> {
    this.fs.removeFromFirestore('paymentInProgress', 'userId');
    this.fs.removeFromFirestore('paid', 'subcription');
    this.confirmation = false;
    const stripe = await this.stripePromise;
    const result =
      (await stripe?.confirmCardPayment(this.clientSecret)) || undefined;
  }

  getUser(): Observable<User> {
    return from(this.auth.getUser());
  }

  async pro(): Promise<void> {
    this.fs.removeFromFirestore('unpaidusers', (await this.auth.getUser()).uid);
    this.fs.getFromFirestore('paidusers', (await this.auth.getUser()).uid);
    this.fs.saveToFirestore('unpaidusers', (await this.auth.getUser()).uid, {
      displayName: (await this.auth.getUser()).displayName,
      email: (await this.auth.getUser()).email,
      photoUrl: (await this.auth.getUser()).photoURL,
      uid: (await this.auth.getUser()).uid,
      subcription: 'active',
    });
    this.loading = false;
  }

  async basic(): Promise<void> {
    this.fs.removeFromFirestore('paidusers', (await this.auth.getUser()).uid);
    this.fs.getFromFirestore('unpaidusers', (await this.auth.getUser()).uid);
    this.fs.removeFromFirestore('unpaidusers', (await this.auth.getUser()).uid);
    this.fs.saveToFirestore('unpaidusers', (await this.auth.getUser()).uid, {
      displayName: (await this.auth.getUser()).displayName,
      email: (await this.auth.getUser()).email,
      photoUrl: (await this.auth.getUser()).photoURL,
      uid: (await this.auth.getUser()).uid,
      subcription: 'not active',
    });
    this.confirmation = false;
  }
  async reload(): Promise<void> {
    window.location.reload();
  }
  async ifPro(): Promise<void> {
    if (!(await this.auth.getUser())) {
      this.pro();
    } else {
      this.basic();
    }
  }

  async paiduser() {
    const urlParams = new URLSearchParams(window.location.search);
    this.fs.getFromFirestore('paid', 'subcription').subscribe(async (user) => {
      if (urlParams.get('my-status') === 'done' && user?.exists) {
        this.pro();
      } else if (urlParams.get('my-status') === 'reject' && user?.exists) {
        this.basic();
      }
    });
  }
}
