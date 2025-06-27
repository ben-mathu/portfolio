import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { SkillRatingComponent } from './skill-rating/skill-rating.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomTextareaComponent } from './custom-textarea/custom-textarea.component';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownModule } from 'ngx-markdown';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SocialIconsComponent } from './social-icons/social-icons.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { CvComponent } from './cv/cv.component';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  exports: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    SkillRatingComponent,
    SidenavComponent,
    CustomTextareaComponent,
    CvComponent,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    SkillRatingComponent,
    SidenavComponent,
    CustomTextareaComponent,
    SocialIconsComponent,
    CvComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MarkdownModule,
    MatToolbarModule,
    MatChipsModule,
    MatSidenavModule,
    MatDialogModule,
    PlatformModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
