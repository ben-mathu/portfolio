import { Component, OnInit } from '@angular/core';
import { Database, getDatabase, onValue, ref } from '@angular/fire/database';
import { ProjectElement } from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Utils } from 'src/app/shared/utils/utils';
import { BaseComponent } from '../base-component';

@Component({
    selector: 'app-list-projects',
    templateUrl: './list-projects.component.html',
    styleUrl: './list-projects.component.scss',
    standalone: false
})
export class ListProjectsComponent extends BaseComponent<ProjectElement> implements OnInit {
  projects: ProjectElement[] = [];
  displayedColumns: string[] = ['index', 'projectName', 'url'];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Projects', 'Projects');

    this.getData();
  }

  override getData() {
    this.firebaseService
      .getAllProjects()
      .then((values) => {
        this.projects = values;
        this.displayedColumns.push('projectDescription');
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  override onDelete() {
    this.getData();
    super.onDelete();
  }

  handleClick(projectDetails: { rowData: ProjectElement; event: Event }) {
    if (
      !this.selectedRow ||
      projectDetails['rowData'].index !== this.selectedRow.index
    ) {
      this.selectedRow = projectDetails['rowData'];
      this.displayedColumns = this.displayedColumns.filter((item) => {
        return item !== 'projectDescription';
      });
    } else {
      this.selectedRow = undefined;
      this.displayedColumns.push('projectDescription');
    }
  }
}
