import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss',
  standalone: false,
})
export class PrivacyComponent {
  title?: string;
  content?: string;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.breadcrumbService.set('@Privacy', 'Privacy Policy');
    const app = this.route.snapshot.paramMap.get('app');

    let privacy = '';
    if (app == 'hfms') {
      this.title = 'Buddy - Home Financial Manager Privacy Policy';
      privacy =
        'https://raw.githubusercontent.com/ben-mathu/ben-mathu/refs/heads/master/docs/hfms_privacy_policy.md';
    } else if (app == 'crypt') {
      this.title = 'Crypt Code';
      privacy =
        'https://raw.githubusercontent.com/ben-mathu/ben-mathu/refs/heads/master/docs/crypt_code_privacy_policy.md';
    }

    this.firebaseService.retrieveContent(privacy).then((content) => {
      this.content = content;
    });
  }
}
