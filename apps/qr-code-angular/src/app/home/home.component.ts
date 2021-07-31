import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }
  loading = false
  nothing = false
  home = false

 

  ngOnInit(): void {
    this.loadingTimeout()
  }
  
  async loadingTimeout() {
    // var that = this;  
                  // no need of this line
  this.loading = true;
  this.nothing = true;
  this.home = false;

 setTimeout(() => {                           //<<<---using ()=> syntax
      this.loading = false;
      this.nothing = false;
      this.home = true;
 }, 5000);
  }

}
