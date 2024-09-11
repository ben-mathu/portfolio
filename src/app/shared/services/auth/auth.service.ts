import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  navigateToAdmin() {
    this.router.navigate(['admin']);
  }

  navigateToLoginPage() {
    this.router.navigate(['admin', 'login']);
  }

  async isLoggedIn() {
    const user = await this.getSignedInUser();
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async getUserId() {
    const user = await this.getSignedInUser();
    if (user) {
      return user.uid;
    } else {
      return undefined;
    }
  }

  getSignedInUser = function() {
    return new Promise<User | undefined>(function (resolve, reject) {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(undefined);
        }
      });
    });
  }
}
