import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { AuthService } from '../services/auth.service';
import { createStripeCheckoutSession, StripBody } from '../../../../qr-code-api/src/utils/checkout';
import {
  Stripe,
  loadStripe,
  SourceResult,
  StripeError,
} from '@stripe/stripe-js';
import { FireStoreService } from '../services/firestore.service';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { take } from 'rxjs/operators';
import { environment } from "../../../../qr-code-api/src/environments/environment";
import stripe from 'stripe';
// tslint:disable-next-line: no-unused-expression
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit, OnInit {
  constructor(private auth: AuthService, private http: HttpClient) {}

  @Input() amount!: number;
  @Input() description!: string;
  @ViewChild('cardElement') cardElement!: ElementRef;

  private fs!: FireStoreService;
  private stripekey!: AngularStripeService;
  card!: any;
  cardErrors!: any;
  error!: StripeError;
  element!: any;
  body!: StripBody
  stripes!: stripe

  notConfirmed = false;
  loading = false;
  notification = false;
  confirmation = false;
  buttonDisabled = true;
  stripe!: Stripe | null;
  details!: any

  async ngOnInit() {
    const user = await this.auth.getUser()
    this.fs?.getFromFirestore('paid', user.uid)
  }
  public async ngAfterViewInit(): Promise<void> {
    this.stripe = await loadStripe(
      'pk_test_51J9MZbJ6E4w7cr4J7bYyZ67szJypiNxIRbJ7U3WtEsjS5mEM1juyVNZLxd4T7ZqBd1H85hxoyp56uHvLg5JMVz6900Zn3nO6tp'
    );
    const elements = this.stripe?.elements();
  
    this.card = elements?.create('card')
  

    this.card.mount(this.cardElement.nativeElement);
    this.card.addEventListener('change', (result: any) => {
      this.cardErrors = this.error && this.error.message;
      console.log(result);
      this.buttonDisabled = result.complete ? false : true;
    });
  }

  async handleForm(e: any): Promise<SourceResult | undefined | void> {
    this.element = 'proceeding your payment';
    this.loading = true;
    e.preventDefault();
    const item = {
      price: 'price_1JA42NJ6E4w7cr4JAdYjpcTw',
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
      quantity: 1,
    };
    const user = await this.auth.getUser()
    const source = await this.stripe?.createSource(this.card, {
        type: this.card
    });
    if (source?.error) {
      this.loading = false;
      // Inform the customer that there was an error.
      this.element = 'sorry we could not confirm your payment'
      this.basic()
      this.buttonDisabled = true;
    } else {
      this.loading = false;
      this.addfirestore();
      this.element = ''
      this.http
        .post('http://localhost:3333/api/checkout',  { item })
        .pipe(take(1))
        .subscribe(
          (result) => {
            console.log('succuss:', result);
          },
          (error) => {
            console.log('error:', error);
            this.errorElem()
          }
        );
       this.pro()
       this.details = source
        }
  }
  async cardInvalid(): Promise<void> {}
  async errorElem() {
    this.element = 'sorry your payment failed';
  }
 async pro() {
    const user = await this.auth.getUser()
    this.fs?.saveToFirestore('paid', user.uid, {active: 'active', email: user.email, displayName: user.displayName})
    this.confirmation = true
    this.element = 'welcome ' + user.displayName + ' to Zaid Pro'
  }
  async basic() {
    const user = await this.auth.getUser()
    this.fs?.removeFromFirestore('paid', user.uid)
    this.confirmation = false
    this.element = ''
    
  }
  async addfirestore() {
    const user = await this.auth.getUser()
    const source = await this.stripe?.createSource(this.card);
    this.fs?.saveToFirestore('paid', user.uid, {displayName: user.displayName, card: source?.source?.card})
  }
}