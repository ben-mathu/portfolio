import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWrapperComponent } from './pages/main-wrapper/main-wrapper.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/main-wrapper/home/home.module').then(
            (m) => m.HomeModule,
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('./pages/main-wrapper/admin/admin.module').then(
            (m) => m.AdminModule,
          ),
      },
    ],
  },
  {
    path: ':app/privacy',
    component: PrivacyComponent,
    data: { breadcrumb: { alias: 'Privacy' } },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
