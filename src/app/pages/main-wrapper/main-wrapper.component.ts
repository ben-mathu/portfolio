import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { MyDetails } from 'src/app/shared/models/header/header';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.scss'],
  standalone: false,
})
export class MainWrapperComponent implements OnInit, OnDestroy {
  isDashboard: boolean = false;
  url: string = '';
  isAuth: boolean = false;
  auth!: Auth | null;
  myDetails!: MyDetails;

  locationEvent$;
  constructor(
    location: Location,
    private authService: AuthService,
    private service: FirebaseService,
    private util: Utils,
  ) {
    authService.authEvents$.subscribe((authUser) => {
      this.auth = authUser;
      this.handleAuthState(authUser?.currentUser);
    });

    this.locationEvent$ = location.onUrlChange((val) => {
      this.url = val;
      if (val.includes('admin')) {
        this.isDashboard = true;
      } else {
        this.isDashboard = false;
      }
    });
  }

  async ngOnInit() {
    this.service.getHeader().then((result) => {
      this.myDetails = result;
    });

    const user = await this.authService.getSignedInUser();
    this.handleAuthState(user);
  }

  handleAuthState(user: User | null | undefined) {
    if (user) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
  }

  ngOnDestroy(): void {
    this.util.unsubscribe();
  }
}
