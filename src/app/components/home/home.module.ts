import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ExperienceComponent } from './experience/experience.component';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleComponent } from './article/article.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    HomePageComponent,
    AboutComponent,
    PortfolioComponent,
    ExperienceComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCardModule,
    MarkdownModule,
    MatSnackBarModule,
    MatIconModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatTreeModule,
    MatTooltipModule
  ]
})
export class HomeModule { }
