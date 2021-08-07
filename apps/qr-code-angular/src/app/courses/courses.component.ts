import { Observable } from 'rxjs';
import { FireStoreService } from './../services/firestore.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private fs: FireStoreService) {}
  courses = false;
  ngOnInit(): void {
    this.privatepage();
  }

  async privatepage(): Promise<void> {
    const user = await this.auth.getUser();
    this.fs.getFromFirestore('paid', user.uid).subscribe(async (data) => {
      if (data.exists) {
        this.courses = true;
      } else {
        this.courses = false;
      }
    })
}
}
