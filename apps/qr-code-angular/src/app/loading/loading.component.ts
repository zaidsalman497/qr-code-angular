import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading = true;
  constructor() { }

  ngOnInit(): void {
    this.loadingTimeout();
  }

  async loadingTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 800);
  }

}
