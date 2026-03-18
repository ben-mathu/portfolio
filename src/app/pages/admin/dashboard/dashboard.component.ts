import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'app-dashboard.full-width',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: false
})
export class DashboardComponent implements OnInit {

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@Dashboard', 'Dashboard');
  }
}
