import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddArticleComponent } from './add-article/add-article.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ArticlesComponent } from './articles/articles.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { CommonModule } from '@angular/common';
import { AchievementsComponent } from './achievements/achievements.component';
import { AddAchievementComponent } from './add-achievement/add-achievement.component';
import { AddCertificateComponent } from './add-certificates/add-certificate.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { JournalLogComponent } from './journal-log/journal-log.component';
import { AddJournalComponent } from './add-journal/add-journal.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
    data: { breadcrumb: { alias: 'Articles' } },
  },
  {
    path: 'articles',
    children: [
      {
        path: 'add-article',
        component: AddArticleComponent,
        data: { breadcrumb: { alias: 'AddArticle' } },
      },
    ],
  },
  {
    path: 'experiences',
    component: ExperiencesComponent,
    data: { breadcrumb: { alias: 'Experiences' } },
  },
  {
    path: 'experiences',
    children: [
      {
        path: 'add-experience',
        component: AddExperienceComponent,
        data: { breadcrumb: { alias: 'AddExperience' } },
      },
    ],
  },
  {
    path: 'projects',
    component: ListProjectsComponent,
    data: { breadcrumb: { alias: 'Projects' } },
  },
  {
    path: 'projects',
    children: [
      {
        path: 'add-project',
        component: AddProjectComponent,
        data: { breadcrumb: { alias: 'AddProject' } },
      },
    ],
  },
  {
    path: 'achievements',
    component: AchievementsComponent,
    data: { breadcrumb: { alias: 'Achievements' } },
  },
  {
    path: 'achievements',
    children: [
      {
        path: 'add-achievement',
        component: AddAchievementComponent,
        data: { breadcrumb: { alias: 'AddAchievement' } },
      },
    ],
  },
  {
    path: 'certificates',
    component: CertificatesComponent,
    data: { breadcrumb: { alias: 'Certificates' } },
  },
  {
    path: 'certificates',
    children: [
      {
        path: 'add-certificate',
        component: AddCertificateComponent,
        data: { breadcrumb: { alias: 'AddCertificate' } },
      },
    ],
  },
  {
    path: 'journal',
    component: JournalLogComponent,
    data: { breadcrumb: { alias: 'Journal' } },
  },
  {
    path: 'journal',
    children: [
      {
        path: 'add-log',
        component: AddJournalComponent,
        data: { breadcrumb: { alias: 'AddJournal' } },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
