import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ArticleElement, JournalElement } from 'src/app/shared/models/header/portfolio.dto';
import { ArticleDetails, JournalDetails } from 'src/app/shared/models/header/portfolio.model';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrl: './add-journal.component.scss'
})
export class AddJournalComponent {
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  private _selectedRow!: JournalElement;

  @Input() set selectedRow(value: JournalElement) {
    this._selectedRow = value;

    if (this.addJournalForm) {
      this.addJournalForm.patchValue({
        title: value.title,
        text: value.log
      });
    }

    this.tags = value.tags ? value.tags : [];
  }

  get selectedRow(): JournalElement {
    return this._selectedRow;
  }

  journalTitleLabel: string = 'Title';
  journalTextLabel: string = 'Log';
  tagsLabel: string = 'Tags';
  addJournalForm!: FormGroup;

  tags: string[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private util: Utils
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set('@AddArticle', 'Add Article');

    this.addJournalForm = this.formBuilder.group({
      title: [
        this.selectedRow ? this.selectedRow.title : '',
        Validators.required,
      ],
      text: [
        this.selectedRow ? this.selectedRow.log : ''
      ],
      tags: [''],
    });

    this.tags = this.selectedRow ? this.selectedRow.tags : [];
  }

  get f() {
    return this.addJournalForm.controls;
  }

  add() {
    try {
      if (!this.tags) this.tags = [];

      const log: JournalDetails = {
        title: this.f['title'].value,
        log: this.f['text'].value,
        tags: this.tags,
        dateCreated: this.selectedRow
          ? this.selectedRow.dateCreated
          : this.util.formatDate(new Date()),
        dateUpdated: this.util.formatDate(new Date())
      };

      if (this.selectedRow) {
        this.firebaseService.updateJournal(log, this.selectedRow.key)
          .then(value => {
            this.onUpdate.emit();
            this.util.showSnackBar('Successfully updated', this.snackBar);
          }).catch(error => {
            this.util.showSnackBar('Journal not updated', this.snackBar);
            console.error(error);
          });
      } else {
        this.firebaseService.saveJournal(log)
          .then(value => {
            this.util.showSnackBar('Successfully saved', this.snackBar);
            this.router.navigate(['admin', 'dashboard', 'journal']);
          }).catch(error => {
            this.util.showSnackBar('Journal not saved', this.snackBar);
            console.error(error);
          });
      }
    } catch (error) {
      this.util.showSnackBar('All Fields are Required', this.snackBar);
      console.error(error);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tags, event.previousIndex, event.currentIndex);
  }

  edit(tag: string, event: MatChipEditedEvent) {
    if (!this.tags) return;

    const index: number = this.tags.indexOf(tag, 0);
    const changedValue: string = event.value.trim();

    if (!changedValue) {
      this.remove(tag);
      return;
    }

    if (index > -1) {
      this.tags[index] = changedValue;
    }
  }

  remove(tag: string) {
    const index: number = this.tags.indexOf(tag, 0);
    if (index > -1) {
      this.tags.splice(index, 1);

      if (this.tags.length > 0) {
        this.f['tags'].setValue(' ');
      } else {
        this.f['tags'].setValue('');
      }
    }
  }

  onChange(event: Event) {
    const inputEvent = event as InputEvent;
    let value = (event.target as HTMLInputElement)?.value;
    if (inputEvent.inputType === 'insertText' && inputEvent.data === ',') {
      value = value.substring(0, value.length - 1);

      if (!this.tags) this.tags = [];

      if (this.tags.includes(value)) {
        return;
      }

      this.tags.push(value);

      this.f['tags'].setValue(' ');
    } else if (
      inputEvent.inputType === 'deleteContentBackward' &&
      value === ''
    ) {
      this.tags.pop();

      if (this.tags.length > 0) {
        this.f['tags'].setValue(' ');
      }
    }
  }

  delete() {
    this.firebaseService.deleteJournal(this.selectedRow.key)
      .then(value => {
        this.util.showSnackBar('Successfully deleted', this.snackBar);
        this.onDelete.emit();
      }).catch(error => {
        this.util.showSnackBar('Journal not deleted', this.snackBar);
        console.error(error);
      });
  }
}
