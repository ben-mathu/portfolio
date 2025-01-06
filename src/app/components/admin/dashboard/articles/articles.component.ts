import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ArticleElement } from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent extends BaseComponent<ArticleElement> implements OnInit {
  articles: ArticleElement[] = [];
  displayedColumns = ['index', 'dateCreated', 'dateUpdated'];

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
      .getAllArticles()
      .then((values) => {
        this.articles = values;
      })
      .catch((error: Error) => {
        this.util.showSnackBar(error.message, this.snackbar);
      });
  }

  handleClick(blogDetails: { rowData: ArticleElement; event: Event }) {
    this.selectedRow = blogDetails['rowData'];
  }

  override onDelete() {
    this.getData();
    super.onDelete();
  }
}
