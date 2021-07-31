import { Stripe } from 'stripe';

import { Injectable } from '@angular/core';
import { ConfirmCardPaymentData, ConfirmCardPaymentOptions, loadStripe, PaymentIntentResult, SetupIntentResult } from '@stripe/stripe-js';
import { error } from 'protractor';
import { async } from 'rxjs/internal/scheduler/async';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
declare var stripe: Promise<Stripe>;
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next('stop');
  }
}


