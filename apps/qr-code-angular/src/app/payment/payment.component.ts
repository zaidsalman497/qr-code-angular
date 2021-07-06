import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import  StripeCheckoutHandler  from "stripe";
import  StripeCheckoutStatic  from "stripe";


declare var StripeCheckout: StripeCheckoutStatic;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private auth: AuthService, private functions: AngularFireFunctions) {}

  @Input() amount: any;
  @Input() description: any;

  handler!: StripeCheckoutHandler;

  confirmation: any;
  loading = false;

  ngOnInit() {
    this.handler = StripeCheckout.configure({
      key: 'pk_test_51J9MZbJ6E4w7cr4J7bYyZ67szJypiNxIRbJ7U3WtEsjS5mEM1juyVNZLxd4T7ZqBd1H85hxoyp56uHvLg5JMVz6900Zn3nO6tp',
      image: '../../assets/img/pro.jpg',
      locale: 'auto',
      source: async (source: any) => {
        this.loading = true;
        const user = await this.auth.getUser();
        const fun = this.functions.httpsCallable('stripeCreateCharge');
        this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
        this.loading = false;

      }
    });
  }

  // Open the checkout handler
  async checkout(e: { preventDefault: () => void; }) {
    const user = await this.auth.getUser();
    this.handler.open({
      name: 'Fireship Store',
      description: this.description,
      amount: this.amount,
      email: user.email,
    });
    e.preventDefault();
  }

  // Close on navigate
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close();
  }

}
