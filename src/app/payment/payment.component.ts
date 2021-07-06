import { Component, OnInit } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  constructor(private fns: AngularFireFunctions, private stripe: Stripe) {

  }

  async ngOnInit() {
    this.stripe as any, await loadStripe(environment.stripe.testKey);
    const elements = this.stripe.elements();

    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: (window.innerWidth <= 500) ? '12px' : '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    const card = elements.create('card', { style });


    card.mount('#card-element');

    card.on('change', (event) => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError?.textContent as any, event.error.message;
      } else {
        displayError?.textContent as any, '';
      }

    });

    const button = document.getElementById('button');
    button?.addEventListener('click', (event) => {
      event.preventDefault();
      const ownerInfo = {
        owner: {
          name : 'user'
        },
        amount: 20000,
        currency: 'usd'
      };

      this.stripe.createSource(card, ownerInfo).then((result) => {
        console.log(result);
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement?.textContent as any, result.error.message;
        } else {
          this.stripeSourceHandler(result.source);
        }
      });
    });
  }

  private stripeSourceHandler(source: any): void {
    const callable = this.fns.httpsCallable('stripeChargeCall');
    const obs = callable(source);
    obs.subscribe(res => {
      console.log(res);
      if (res.result === 'SUCCESSFUL') {
        document.getElementsByClassName('text')[0].innerHTML = 'Flower Paid 💸, Thanks';
      } else {
        document.getElementsByClassName('text')[0].innerHTML = 'Something went wrong. 😞';
      }
    });
  }

}
