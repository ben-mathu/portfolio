import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MainWrapperComponent } from './main-wrapper.component';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { MainWrapperRoutingModule } from './main-wrapper-routing.module';

@NgModule({
  declarations: [MainWrapperComponent],
  bootstrap: [MainWrapperComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    RouterModule,
    MatIconModule,
    MarkdownModule.forRoot(),
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MainWrapperRoutingModule,
    HomeModule,
    AdminModule,
  ],
})
export class MainWrapperModule {}
