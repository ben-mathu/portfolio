import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  AchievementElement,
  CertificateElement,
} from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BaseComponent } from '../base-component';

@Component({
    selector: 'app-achievements',
    templateUrl: './certificates.component.html',
    styleUrl: './certificates.component.scss',
    standalone: false
})
export class CertificatesComponent extends BaseComponent<CertificateElement> implements OnInit {
  certificates: CertificateElement[] = [];
  displayedColumns = ['index', 'name', 'dateCreated'];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Certificates', 'Certificates');
    this.getData();
  }

  override getData() {
    this.firebaseService
      .getCertificates()
      .then((values) => {
        this.certificates = values;
        this.displayedColumns.push('url');
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(certificateDetails: {
    rowData: CertificateElement;
    event: Event;
  }) {
    if (
      !this.selectedRow ||
      certificateDetails['rowData'].index !== this.selectedRow.index
    ) {
      this.selectedRow = certificateDetails['rowData'];
      this.displayedColumns = this.displayedColumns.filter((item) => {
        return item !== 'url';
      });
    } else {
      this.selectedRow = undefined;
      this.displayedColumns.push('url');
    }
  }

  override onDelete(): void {
    super.onDelete();
    this.getData();
  }
}
