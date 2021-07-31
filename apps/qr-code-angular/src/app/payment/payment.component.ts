import { from, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { User } from '../services/user.model';
import { FireStoreService } from '../services/firestore.service';
import { userInfo } from 'os';
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
  notconfirmed = false
  nothing = false
  loading = false
  priceId = 'price_1JA42NJ6E4w7cr4JAdYjpcTw';
  clientSecret!: string;
  fail!: StripeError;
  error!: StripeError
  async checkout(): Promise<void> {
    const stripe = await this.stripePromise;
    this.loading = true
    const error = stripe?.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: this.priceId, quantity: 1 }],
      successUrl: 'http://localhost:4200/payment?my-status=done',
      cancelUrl: 'http://localhost:4200/payment?my-status=reject',
    })
    console.log('checkout-2-status');
    return this.status();
  }
  async status(): Promise<void> {
    this.getUser().subscribe(async (user) => {
      this.fs.saveToFirestore('paymentInProgress', 'userId', { displayname: user.displayName });
      this.fs.saveToFirestore('paid', 'subcription', { email: user.email, Active: 'active', displayName: user.displayName })
      this.fs.saveToFirestore('users', 'subcription', { email: user.email, Active: 'active', displayName: user.displayName })
      const stripe = await this.stripePromise;
      const result = await stripe?.confirmCardPayment(this.clientSecret);

    });
  
  }
  ngOnInit(): void {
   const urlParams = new URLSearchParams(window.location.search);
    this.fs.getFromFirestore('paymentInProgress', 'userId').subscribe((obj) => {
      if (urlParams.get('my-status') === 'done' && obj?.exists) {
        this.confirmation = true;
        this.fs.removeFromFirestore('paymentInProgress', 'userId');
      } else if (urlParams.get('my-status') === 'reject' && obj?.exists) {}
      this.confirmation = false;
      this.fs.removeFromFirestore('paymentInProgress', 'userId');
    });
    this.fs.getFromFirestore('paid', 'subcription').subscribe((subcription) => {
           if (urlParams.get('my-status') === 'done' && subcription.exists) {
             this.confirmation = true;
           }
    })
    this.fs.getFromFirestore('userpaid', 'subcription').subscribe((subcription) => {
      if (urlParams.get('my-status') === 'done' && subcription.exists) {
        this.confirmation = true;
      }
      var confirmation = this.confirmation = false
      this.fs.saveToFirestore('userActive', 'unactiveuser', { 
        Active: 'not active',
    confirmation
  })
})
  }

  async back(): Promise<void> { 
    this.fs.removeFromFirestore('paymentInProgress', 'userId');
    this.fs.removeFromFirestore('paid', 'subcription');
    this.confirmation = false
    }

  getUser(): Observable<User> {
    return from(this.auth.getUser());
    
  }
  
  async loadingTimeout() {
    // var that = this;  
this.confirmation = false                           // no need of this line
this.loading = true;

setTimeout(() => {      
        this.loading = false;
      this.confirmation = true
 }, 5000);
  

}
}
