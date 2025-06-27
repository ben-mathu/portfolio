import { MyDetails } from 'src/app/shared/models/header/header';
import { Component, Input, OnInit } from '@angular/core';
import { Utils } from '../../utils/utils';
import { MatDialog } from '@angular/material/dialog';
import { CvComponent } from '../cv/cv.component';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'custom-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() myDetails?: MyDetails | undefined;
  utils: Utils;
  platform: Platform;

  constructor(utils: Utils, private dialog: MatDialog, platform: Platform) {
    this.utils = utils;
    this.platform = platform;
  }

  openCvDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(CvComponent, {
      width: '800px',
      height: '300px',
      enterAnimationDuration: enterAnimationDuration,
      exitAnimationDuration: exitAnimationDuration,
    });
  }
}
