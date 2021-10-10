
  // tslint:disable: max-line-length
import { AuthService } from './../services/auth.service';
import { FireStoreService } from './../services/firestore.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { StripeCardComponent, StripeService } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentRequestPaymentMethodEvent,
  PaymentIntent,
  PaymentRequestShippingAddressEvent,
  StripeCardElementOptions,
} from '@stripe/stripe-js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../qr-code-api/src/environments/environment';
import { Stripe } from 'stripe';


  // tslint:disable: typedef
@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
   text!: string;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest!: FormGroup;


  constructor(private http: HttpClient, private fb: FormBuilder, private stripeService: StripeService, private fs: FireStoreService, private auth: AuthService) {}

   ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

 async createToken(): Promise<void> {
    const name = this.stripeTest.get('name')?.value;
    const item = {
      price: 'price_1JA42NJ6E4w7cr4JAdYjpcTw',
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
      quantity: 1,
    };
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe(async (result) => {
        if (result.token) {
          const user = await this.auth.getUser();
          this.http
          .post('http://localhost:3333/api/create',  {  email: user.email, token: result.token.id, item: item })
          .pipe(take(1))
          .subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (result) => {
              console.log('succuss:', result);
            },
            (error) => {
              console.log('error:', error);
            }
          );
          this.fs.getFromFirestore('paid', user.uid);
          // tslint:disable-next-line: max-line-length
          this.fs.saveToFirestore('paid', user.uid, {tokenid: result?.token?.id, name: user.displayName, exp_month: result?.token?.card?.exp_month, exp_year: result?.token?.card?.exp_year, last4: result?.token?.card?.last4});
          this.text = result.token.id;
          
        } else if (result.error) {
          // Error creating the token
        this.text = 'please complete your card';
        }
      });
  }
}
