import { Auth } from '@angular/fire/auth';
import { MyDetails } from '../../models/header/header';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() headerData!:  MyDetails;
  @Input() isAuth: boolean = false;
  @Input() isDashboard: boolean = false;
  auth: Auth;

  collapse: boolean = false;

  constructor(private router: Router, private firebaseService: FirebaseService) {
    this.auth = firebaseService.getAuth();
  }

  logout() {
    this.firebaseService.signOut(this.auth).then(() => {
      this.router.navigate(['admin', 'login']);
    }).catch((err) => {
      // Error could not sigout
    });
  }

  toggleSocialButtons() {
    this.collapse = !this.collapse;
  }
}
