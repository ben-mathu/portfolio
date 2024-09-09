import { animate, state, style, transition, trigger } from '@angular/animations';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import {
  AchievementElement,
  ArticleElement,
  CertificateElement,
  ExperienceElement,
  ProjectElement,
} from 'src/app/shared/models/header/portfolio.dto';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Constants } from 'src/app/shared/utils/constants';
import { Utils } from 'src/app/shared/utils/utils';
import { BreadcrumbService } from 'xng-breadcrumb';

interface Article {
  key: string | undefined;
  title: string | undefined;
  type: string | undefined;
}

interface ArticleNode {
  article: Article;
  children?: ArticleNode[];
}

interface ArticleNodeInfo {
  expandable: boolean;
  level: number;
  article: Article;
}

@Component({
  selector: 'app-article.full-width',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  animations: [
    trigger('slideInOut', [
      state('left', style({ transform: 'translateX(-100%)', display: 'none'})),
      state('center', style({ transform: 'translateX(0)', display: 'flex'})),
      state('right', style({ transform: 'translateX(105%)', display: 'none'})),
      transition('* => *', animate('800ms ease-in-out'))
    ])
  ]
})
export class ArticleComponent implements OnInit {
  // Constants
  static readonly ARTICLE = '@Article'

  experiences?: ExperienceElement[];
  projects?: ProjectElement[];
  articles?: ArticleElement[];
  achievements?: AchievementElement[];
  certificates?: CertificateElement[];

  experience?: ExperienceElement;
  project?: ProjectElement;
  article?: ArticleElement;
  achievement?: AchievementElement;
  certificate?: CertificateElement;

  currentCategory?: string;
  parentNodeLevel?: number;

  articleData?: ArticleNode[];
  private _transformer = (node: ArticleNode, level: number) => {

    if (this.currentCategory && this.currentCategory === node.article.type) {
      this.parentNodeLevel = level;
    }

    return {
      expandable: !!node.children && node.children.length > 0,
      article: node.article,
      level: level
    }
  }

  treeControl = new FlatTreeControl<ArticleNodeInfo>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  articleCarousel: Article[] = [];
  carouselDeque: Article[] = [];
  indexDeque: number[] = [];

  utils: Utils;

  currentIndex = 0;
  prevIndex = 0;
  interval: NodeJS.Timeout | undefined;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private service: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    utils: Utils
  ) {
    this.utils = utils;

    this.startInterval();
  }

  hasChild = (_: number, node: ArticleNodeInfo) => node.expandable;

  ngOnInit(): void {
    this.breadcrumbService.set('@Article', 'Article');
    this.activatedRoute.params.subscribe(async (params) => {
      let id = params['id'];
      this.articleCarousel = [];

      try {
        this.experiences = await this.service.getAllExperiences();
        this.setExperience(id);
      } catch (error) {
        // catch error
      }

      try {
        this.projects = await this.service.getAllProjects();
        this.setProject(id);
      } catch (error) {
        // catch error
      }

      try {
        this.articles = await this.service.getAllArticles();
        this.setBlog(id);
      } catch (error) {
        // catch error
      }

      try {
        this.achievements = await this.service.getAchievements();
        this.setAchievement(id);
      } catch (error) {
        // catch error
      }

      try {
        this.certificates = await this.service.getCertificates();
        this.setCertificate(id);
      } catch (error) {
        // catch error
      }

      this.dataSource.data = this.articleData!;
      this.expandSelectedNode();
    });
  }

  expandSelectedNode() {
    if (this.currentCategory) {
      const parentNode = this.treeControl.dataNodes.filter(node => node.article.type === this.currentCategory)[0];
      this.treeControl.expand(parentNode);
    }
  }

  /**
   * Maps articles in categories
   *
   * 1 Article Category
   *    1.1 Article ID
   *        1.1.1 Title & Type
   *
   * @param title - Title of the article
   * @param type - Type of the article
   * @param articleId - Key Provided by firebase
   * @param categoryKey - corresponds to the article type, a key for list of article
   */
  addToMap(title: string, type: string, articleId: string, categoryKey: string) {
    // Only add poject, article and tool types to article tree

    if ((categoryKey === Constants.PROJECT || categoryKey === Constants.ARTICLE || categoryKey === Constants.TOOL) && this.dataSource.data.length === 0) {
      if (!this.articleData) {
        this.articleData = [
          {
            article: { key: articleId, title: type, type: categoryKey },
            children: []
          }
        ]
      } else {
        const currentNodeArr = this.articleData.filter(node => node.article.type === categoryKey);
        if (currentNodeArr.length === 0) {
          this.articleData.push({
            article: { key: articleId, title: type, type: categoryKey },
            children: []
          });
        }
      }

      // Update the tree
      const currentNode = this.articleData?.filter(node => node.article.type === categoryKey )[0];
      currentNode.children?.push({
        article: { key: articleId, title: title, type: categoryKey },
      });
      this.articleData = this.articleData.filter(node => node.article.type !== categoryKey);
      this.articleData.push(currentNode);
    }

    const a: Article = {
      key: articleId,
      title: title,
      type: type
    }
    this.articleCarousel.push(a);

    if (this.carouselDeque.length <= 2) {
      this.carouselDeque.push(a);
    }
  }

  setCertificate(id: string) {
    this.certificates?.map((certificate) => {
      const articleType = this.utils.capitalize(Constants.CERTIFICATE);
      if (certificate.key === id) {
        this.certificate = certificate;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, certificate.name)
        );
      }

      this.addToMap(
        certificate.name,
        articleType,
        certificate.key,
        Constants.CERTIFICATE
      );
    });
  }

  setAchievement(id: string) {
    this.achievements?.map((achievement) => {
      const articleType = this.utils.capitalize(Constants.ACHIEVEMENT);
      if (achievement.key === id) {
        this.achievement = achievement;
        this.certificate = undefined;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, achievement.name)
        );
      }

      this.addToMap(
        achievement.name,
        articleType,
        achievement.key,
        Constants.ACHIEVEMENT
      );
    });
  }

  setBlog(id: string) {
    this.articles?.map((article) => {
      const articleType = this.utils.capitalize(Constants.ARTICLE);
      if (article.key === id) {
        this.article = article;
        this.certificate = undefined;
        this.achievement = undefined;
        this.experience = undefined;
        this.project = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, article.title)
        );
      }

      this.addToMap(
        article.title,
        articleType,
        article.key,
        Constants.ARTICLE
      );
    });
  }

  getBreadcrumb(articleType: string, articleTitle: string): string {
    return articleType + ' :: ' + articleTitle;
  }

  setProject(id: string) {
    this.projects?.map((project) => {
      const articleType = this.utils.capitalize(project.type === 'Tool' ? Constants.TOOL : Constants.PROJECT);
      const categoryKey = project.type === 'Tool' ? Constants.TOOL : Constants.PROJECT;
      if (project.key === id) {
        this.currentCategory = categoryKey;

        this.project = project;
        this.certificate = undefined;
        this.achievement = undefined;
        this.article = undefined;
        this.experience = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, project.projectName)
        );
      }

      this.addToMap(
        project.projectName,
        articleType,
        project.key,
        categoryKey
      );
    });
  }

  setExperience(id: string): void {
    this.experiences?.map((experience) => {
      const articleType = this.utils.capitalize(Constants.EXPERIENCE)
      if (experience.key === id) {
        this.experience = experience;
        this.certificate = undefined;
        this.achievement = undefined;
        this.project = undefined;
        this.article = undefined;
        this.breadcrumbService.set(
          Constants.ARTICLE_REF_NAME,
          this.getBreadcrumb(articleType, experience.title)
        );
      }

      this.addToMap(
        experience.title,
        articleType,
        experience.key,
        Constants.EXPERIENCE
      );
    });
  }

  getSlideAnimation(index: number) {
    if (index === this.currentIndex - 1) {
      return 'left';
    } else if (index === this.currentIndex) {
      return 'center';
    } else if (index === (this.currentIndex + 1) % this.articleCarousel.length) {
      return 'right';
    } else {
      return 'left';
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.articleCarousel.length;
  }

  previousSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.articleCarousel.length) % this.articleCarousel.length;
  }

  startInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
