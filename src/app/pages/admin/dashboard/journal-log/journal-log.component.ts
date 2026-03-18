import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utils } from 'src/app/shared/utils/utils';
import { ArticleElement, JournalElement } from 'src/app/shared/models/header/portfolio.dto';

@Component({
    selector: 'app-journal-log',
    templateUrl: './journal-log.component.html',
    styleUrl: './journal-log.component.scss',
    standalone: false
})
export class JournalLogComponent extends BaseComponent<JournalElement> implements OnInit {
  journal: JournalElement[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private breadcrumbService: BreadcrumbService,
    private snackbar: MatSnackBar,
    private util: Utils
  ) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.set('@Articles', 'Articles');

    this.getData();
  }

  override getData() {
    this.firebaseService
      .getJournal()
      .then((values) => {
        this.journal = values;
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(listItemData: { data: JournalElement, event: Event }) {
    if (
      !this.selectedRow ||
      listItemData['data'].index !== this.selectedRow.index
    ) {
      this.selectedRow = listItemData['data'];
    } else {
      this.selectedRow = undefined;
    }
  }

  override onDelete() {
    this.getData();
    super.onDelete();
  }
}
