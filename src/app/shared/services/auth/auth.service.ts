import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authEvents$ = new Subject<Auth | null>();

  constructor(private router: Router) {}

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

  loginUser(email: string, password: string): Promise<UserCredential> {
    return new Promise<UserCredential>((resolve, reject) => {
      signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredentials) => {
          this.authEvents$.next(this.getAuth());
          resolve(userCredentials);
        })
        .catch((error) => reject(error));
    });
  }

  logout(auth: Auth): Promise<void> {
    return this.getAuth().signOut();
  }

  getSignedInUser(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(
        getAuth(),
        (user) => resolve(user),
        (error) => reject(error)
      );
    });
  }

  getAuth(): Auth {
    return getAuth();
  }
}
