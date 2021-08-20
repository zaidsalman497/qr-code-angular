import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public auth: AuthService, private router: Router) { }
  async login() {
    const user = await this.auth.getUser()
    if (user) {
      this.router.navigateByUrl('loggedin')
    }
  }
  }
