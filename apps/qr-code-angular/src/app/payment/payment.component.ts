import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { resourceLimits } from 'worker_threads';
import { User } from '../services/user.model';
import { FireStoreService } from '../services/firestore.service';
// tslint:disable-next-line: no-unused-expression
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private auth: AuthService, private fs: FireStoreService) {}
  stripePromise = loadStripe(environment.stripe.stripe_key);
  confirmation = false;
  loading = false;
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  clientSecret!: string;
  fail!: StripeError;
  async checkout(): Promise<void> {
    const stripe = await this.stripePromise;
    console.log('checkout-1-status');
    const error = stripe?.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: this.priceId, quantity: 1 }],
      successUrl: 'http://localhost:4200/payment?my-status=done',
      cancelUrl: 'http://localhost:4200/payment?my-status=reject',
    });
    console.log('checkout-2-status');
    return this.status(this.clientSecret);
  }
  async status(clientSecret: string): Promise<void> {
    this.getUser().subscribe(async (user) => {
      this.fs.saveToFirestore('paymentInProgress', 'userId', { id: user.uid });
      const stripe = await this.stripePromise;
      const result = await stripe?.confirmCardPayment(clientSecret);
    });
  
  }
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.fs.getFromFirestore('paymentInProgress', 'userId').subscribe((obj) => {
      if (urlParams.get('my-status') === 'done' && obj?.exists) {
        this.confirmation = true;
        this.fs.removeFromFirestore('paymentInProgress', 'userId');
      }
    });
  }

  async back(): Promise<void> { 
    this.fs.removeFromFirestore('paymentInProgress', 'userId');
    this.timeOut() === undefined
      ? (this.loading = false)
      : (this.loading = true);
    this.confirmation = false;
  }

  async timeOut(): Promise<void> {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  getUser(): Observable<User> {
    return from(this.auth.getUser());
  }
}
