import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

import { AuthService } from '../services/auth.service';
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
// tslint:disable-next-line: no-unused-expression
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit {
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

  notConfirmed = false;
  loading = false;
  notification = false;
  confirmation = false;
  buttonDisabled = true;
  stripe!: Stripe | null;

  public async ngAfterViewInit(): Promise<void> {
    this.stripe = await loadStripe(
      'pk_test_51J9MZbJ6E4w7cr4J7bYyZ67szJypiNxIRbJ7U3WtEsjS5mEM1juyVNZLxd4T7ZqBd1H85hxoyp56uHvLg5JMVz6900Zn3nO6tp'
    );
    const elements = this.stripe?.elements();

    this.card = elements?.create('card');
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
    const source = await this.stripe?.createSource(this.card);
    if (source?.error) {
      // Inform the customer that there was an error.
      this.element = this.error.message;
      this.confirmation = false;
      this.buttonDisabled = true;
    } else {
      this.http
        .post('http://localhost:3333/api/checkout',  { item })
        .pipe(take(1))
        .subscribe(
          (result) => {
            console.log('succuss:', result);
          },
          (error) => {
            console.log('error:', error);
          }
        );

      // Send the token to your server.
      if (source?.source?.status === 'chargeable') {
        this.confirmation = true;
        this.element = 'you did a seccussful payment';
        this.notification = true;
      } else if (source?.source?.status === 'failed') {
        this.confirmation = false;
        this.element = 'sorry your card have been declined';
      } else if (source?.source?.status === 'pending') {
        this.confirmation = false;
        this.element = 'your card is still pending';
      }
    }
  }
  async cardInvalid(): Promise<void> {}
}
