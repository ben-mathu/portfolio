import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, MatCardModule, MarkdownModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {
  title?: string;
  content?: string;
  app?: string;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.breadcrumbService.set('@Privacy', 'Privacy Policy');
    this.app = this.route.snapshot.paramMap.get('app') ?? '';

    if (this.app == 'hfms') {
      this.title = 'Buddy - Home Financial Manager Privacy Policy';
    } else if (this.app == 'crypt') {
      this.title = 'Crypt Code Privacy Policy';
    } else {
      this.title = 'Privacy Policy';
    }
  }
}
