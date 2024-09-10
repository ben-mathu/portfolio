import { MyDetails } from 'src/app/shared/models/header/header';
import { Component, Input, OnInit } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'custom-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() myDetails?: MyDetails | undefined;
  utils: Utils;

  constructor(utils: Utils) {
    this.utils = utils;
  }
}
