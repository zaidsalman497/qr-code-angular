import { from, Observable } from 'rxjs';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Stripe, loadStripe, SourceResult, StripeError } from '@stripe/stripe-js';
import { User } from '../services/user.model';
import { FireStoreService } from '../services/firestore.service';
import { PaymentService } from './payment.service';
import { AngularFireFunctions } from "@angular/fire/functions";
import { AngularStripeService } from "@fireflysemantics/angular-stripe-service";
// tslint:disable-next-line: no-unused-expression
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private auth: AuthService, private fs: FireStoreService, private stripekey: AngularStripeService) {}

  @Input() amount!: number;
  @Input() description!: string;
  @ViewChild('cardElement') cardElement!: ElementRef;

  card!: any;
  cardErrors!: any;
  error!: StripeError

  loading = false;
  confirmation = false;
  ifdisabled = true;
  stripe!: Stripe | null;


  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51J9MZbJ6E4w7cr4J7bYyZ67szJypiNxIRbJ7U3WtEsjS5mEM1juyVNZLxd4T7ZqBd1H85hxoyp56uHvLg5JMVz6900Zn3nO6tp');
    const elements = this.stripe?.elements();

    this.card = elements?.create('card');
    this.card.mount(this.cardElement.nativeElement);

    this.card.addEventListener('change', ({   }) => {
        this.cardErrors = this.error && this.error.message;
        this.ifdisabled = false
    });
  }

  async handleForm(e: any): Promise<SourceResult | undefined | void> {
    e.preventDefault();
    const source = await this.stripe?.createSource(this.card);
    

    if (this.error) {
      // Inform the customer that there was an error.
      this.cardErrors = source?.error?.message;
      this.confirmation = false
      this.ifdisabled = true
    } else {
      // Send the token to your server.
     const result = source?.source?.id
      this.confirmation = true
    }
  }
}
