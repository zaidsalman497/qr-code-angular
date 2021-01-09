import { addScript } from 'src/utils/add-script';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public email!: string;
  public name!: string;
  public password!: string;
  public error!: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  public async signUp(): Promise<void> {
    try {
      await this.auth.customSignUp(this.name, this.email, this.password);
    } catch (ex) {
      this.error = ex;
    }
  }

}
