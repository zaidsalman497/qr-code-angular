import { Stripe } from 'stripe';

import { Injectable } from '@angular/core';
import { ConfirmCardPaymentData, ConfirmCardPaymentOptions, loadStripe, PaymentIntentResult, SetupIntentResult } from '@stripe/stripe-js';
import { error } from 'protractor';
import { async } from 'rxjs/internal/scheduler/async';
import { environment } from '../../environments/environment';
declare var stripe: Promise<Stripe>;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {

}


