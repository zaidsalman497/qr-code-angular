import { from, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { User } from '../services/user.model';
import { FireStoreService } from '../services/firestore.service';
import { userInfo } from 'os';
import { PaymentService } from './payment.service';
// tslint:disable-next-line: no-unused-expression
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private fs: FireStoreService,
    private payment: PaymentService
  ) {}
  stripePromise = loadStripe(environment.stripe.stripe_key);
  confirmation = false;
  notconfirmed = false;
  nothing = false;
  loading = false;
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  clientSecret!: string;
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
  ngOnInit() {
    this.confirm()
    this.payment.basic(this.confirmation = false)
    const urlParams = new URLSearchParams(window.location.search);
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
          this.payment.pro();
           if (this.payment.pro()) {
             this.payment.basic
             this.confirmation = true
           } else if (this.payment.basic()) {
             this.confirmation = false
           }
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

            const stripe = await this.stripePromise;
            const result = await stripe?.confirmCardPayment(this.clientSecret);
          });
        } else if (urlParams.get('my-status') === 'reject' && obj?.exists) {
          this.confirmation = false;
          this.fs.removeFromFirestore('paymentInProgress', 'userId');
          this.fs.removeFromFirestore('paid', 'subcription');
        }
      });
  }

  async back(): Promise<void> {
    this.fs.removeFromFirestore('paymentInProgress', 'userId');
    this.fs.removeFromFirestore('paid', 'subcription');
    this.confirmation = false;
  }

  getUser(): Observable<User> {
    return from(this.auth.getUser());
  }

  async loadingTimeout() {
    // var that = this;
    this.confirmation = false; // no need of this line
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.confirmation = false;
    }, 5000);
  }
  confirm() {
    this.confirmation = true
  }
}
