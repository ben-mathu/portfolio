import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Utils } from '../../utils/utils';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @Input() url: string = '';
  isMobile!: boolean;

  constructor(private util: Utils) {}

  ngOnInit(): void {
    this.util.screenState?.subscribe(state => {
      if (state === Breakpoints.XSmall || state === Breakpoints.Small) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    })
  }
}
