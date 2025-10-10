import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AchievementElement } from 'src/app/shared/models/header/portfolio.dto';
import { AchievementDetails } from 'src/app/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
    selector: 'app-add-achievement',
    templateUrl: './add-achievement.component.html',
    styleUrl: './add-achievement.component.scss',
    standalone: false
})
export class AddAchievementComponent implements OnInit {
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  private _selectedRow!: AchievementElement | undefined;

  @Input() set selectedRow(value: AchievementElement) {
    this._selectedRow = value;

    if (this.addAchievementForm) {
      this.addAchievementForm.patchValue({
        name: value.name,
        text: value.description
      });
    }
  }

  get selectedRow(): AchievementElement | undefined {
    return this._selectedRow;
  }

  achievementNameLabel: string = 'Name';
  achievementUrlLabel: string = 'URL';
  achievementDescriptionLabel: string = 'Description';

  addAchievementForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private snackBar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@AddAchievement', 'Add Achievement');

    this.addAchievementForm = this.formBuilder.group({
      name: [
        this.selectedRow ? this.selectedRow.name : '',
        Validators.required,
      ],
      text: [
        this.selectedRow ? this.selectedRow.description : '',
        Validators.required,
      ],
    });
  }

  get f() {
    return this.addAchievementForm.controls;
  }

  add() {
    try {
      const achievement: AchievementDetails = {
        name: this.f['name'].value,
        description: this.f['text'].value,
        dateCreated: this.selectedRow
          ? this.selectedRow.dateCreated
          : this.util.formatDate(new Date()),
      };

      if (this.selectedRow) {
        this.firebaseService.updateAchievement(achievement, this.selectedRow.key)
          .then(value => {
            this.util.showSnackBar('Successfully updated', this.snackBar);
            this.onUpdate.emit();
          }).catch(error => {
            this.util.showSnackBar('Error updating achievement', this.snackBar);
            console.error(error);
          });
      } else {
        this.firebaseService.saveAchievement(achievement)
          .then(value => {
            this.util.showSnackBar('Successfully saved', this.snackBar);
            this.router.navigate(['admin', 'dashboard', 'achievements']);
          }).catch(error => {
            this.util.showSnackBar('Successfully saved', this.snackBar);
            console.error(error);
          });
      }
    } catch (error) {
      this.util.showSnackBar('All Fields are Required', this.snackBar);
    }
  }

  delete() {
    this.firebaseService.deleteAchievement(this.selectedRow!.key)
      .then(value => {
        this.util.showSnackBar('Successfully deleted', this.snackBar);
        this.onDelete.emit();
      }).catch(error => {
        this.util.showSnackBar('Error deleting achievements', this.snackBar);
        console.error(error);
      });
  }
}
