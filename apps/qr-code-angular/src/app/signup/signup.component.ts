import { addScript } from '../../utils/add-script';
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
  public status!: any;


  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }

  public async signUp(): Promise<void> {
    try {
      await this.auth.customSignUp(this.name, this.email, this.password, this.status);
      this.status = 'To signin, Please verify email in your inbox.';
    } catch (ex) {
      this.status = ex;
    }
  }

}
