import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { SharedModule } from './shared/components/shared.module';
import { HomeModule } from './pages/home/home.module';
import { AdminModule } from './pages/admin/admin.module';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { Utils } from './shared/utils/utils';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PrivacyComponent } from './pages/privacy/privacy.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, PrivacyComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
    MatIconModule,
    MatTabsModule,
    MatCardModule,
    FirestoreModule,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    MatTreeModule,
    MatFormFieldModule,
    SharedModule,
  ],
  providers: [
    // ScreenTrackingService,UserTrackingService
    { provide: APP_BASE_HREF, useValue: environment.baseUrl },
    provideHttpClient(withInterceptorsFromDi()),
    MatIconRegistry,
    {
      provide: Utils,
    },
    ScreenTrackingService,
    UserTrackingService,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
})
export class AppModule {}
