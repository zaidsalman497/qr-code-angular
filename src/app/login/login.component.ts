import { Component, OnDestroy, OnInit } from '@angular/core';
import { addScript, removeScript } from 'src/utils/add-script';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public email!: string;
  public password!: string;
  public error!: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public async signIn(): Promise<void> {
    try {
      await this.authService.customSignIn(this.email, this.password);
    } catch (ex) {
      this.error = ex;
    }
  }
}
