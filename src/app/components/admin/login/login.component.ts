import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'app-login.full-width',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utils: Utils,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Login', 'Login');

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onRevealPasswordEvent(event: Event) {
    event.preventDefault();
    if (event?.type === 'submit') {
      this.passwordVisible = !this.passwordVisible;
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.authService
      .loginUser(this.f['email'].value, this.f['password'].value)
      .then((userCredentials) => {
        if (userCredentials.user) {
          this.router.navigate(['admin']);
        }
      })
      .catch((error) => {
        this.utils.showSnackBar(error.message, this.snackBar);
      });
  }
}
