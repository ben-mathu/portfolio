import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { AchievementElement } from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BaseComponent } from '../base-component';

@Component({
    selector: 'app-achievements',
    templateUrl: './achievements.component.html',
    styleUrl: './achievements.component.scss',
    standalone: false
})
export class AchievementsComponent extends BaseComponent<AchievementElement> implements OnInit {
  achievements: AchievementElement[] = [];
  displayedColumns = ['index', 'name', 'url', 'dateCreated'];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Achievements', 'Achievements');
    this.getData();
  }

  override getData() {
    this.firebaseService
      .getAchievements()
      .then((values) => {
        this.achievements = values;
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(achievementDetails: {
    rowData: AchievementElement;
    event: Event;
  }) {
    if (
      !this.selectedRow ||
      achievementDetails['rowData'].index !== this.selectedRow.index
    ) {
      this.selectedRow = achievementDetails['rowData'];
    } else {
      this.selectedRow = undefined;
    }
  }

  override onDelete() {
    this.getData();
    super.onDelete();
  }
}
