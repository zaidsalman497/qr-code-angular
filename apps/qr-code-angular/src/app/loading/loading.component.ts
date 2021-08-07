import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadingTimeout();
  }

  async loadingTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }

}
