import { BreadcrumbService } from 'xng-breadcrumb';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ExperienceElement } from 'src/app/shared/models/header/portfolio.dto';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Utils } from 'src/app/shared/utils/utils';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.scss',
})
export class ExperiencesComponent extends BaseComponent<ExperienceElement> implements OnInit {
  experiences: ExperienceElement[] = [];
  displayedColumns: string[] = [
    'index',
    'title',
    'startDate',
    'endDate',
    'company',
  ];

  constructor(
    private firebaseService: FirebaseService,
    private breadcrumbService: BreadcrumbService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Experiences', 'Experiences');

    this.getAllExperiences();
  }

  getAllExperiences() {
    this.firebaseService
      .getAllExperiences()
      .then((values) => {
        this.experiences = values;
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(experienceDetails: { rowData: ExperienceElement; event: Event }) {
    if (
      !this.selectedRow ||
      experienceDetails['rowData'].index !== this.selectedRow.index
    ) {
      this.selectedRow = experienceDetails['rowData'];
    } else {
      this.selectedRow = undefined;
    }
  }

  override onDelete() {
    this.getAllExperiences();
    super.onDelete();
  }
}
