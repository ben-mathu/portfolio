import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AdminComponent, LoginComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  providers: [provideAuth(() => getAuth()), AuthService, provideAnimations()],
})
export class AdminModule {}
