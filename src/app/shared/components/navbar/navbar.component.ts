import { Auth } from '@angular/fire/auth';
import { MyDetails } from '../../models/header/header';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Utils } from '../../utils/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() headerData!: MyDetails;
  @Input() isAuth: boolean = false;
  @Input() isDashboard: boolean = false;
  @Input() auth!: Auth | null;

  collapse: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utils: Utils,
    private snackBar: MatSnackBar
  ) {}

  logout() {
    this.authService
      .logout(this.auth!)
      .then(() => {
        this.authService.authEvents$.next(this.auth);
        this.router.navigate(['admin', 'login']);
      })
      .catch((err) => {
        console.error(err.message, err);
        this.utils.showSnackBar('Could not log you out', this.snackBar);
      });
  }

  toggleSocialButtons() {
    this.collapse = !this.collapse;
  }
}
