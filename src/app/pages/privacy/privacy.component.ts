import { Component } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import hfms_privacy_policy from 'raw-loader!../../../assets/files/hfms_privacy_policy.md';
import crypt_code_privacy_policy from 'raw-loader!../../../assets/files/crypt_code_privacy_policy.md';

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
      privacy = hfms_privacy_policy;
    } else if (app == 'crypt') {
      this.title = 'Crypt Code';
      privacy = crypt_code_privacy_policy;
    }

    this.firebaseService.retrieveContent(privacy).then((content) => {
      this.content = content;
    });
  }
}
