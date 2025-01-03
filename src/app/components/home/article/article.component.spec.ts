import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { RouterModule } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['getAllExperiences', 'getAllProjects', 'getAllArticles', 'getAchievements', 'getCertificates']);

    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [ArticleComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    mockFirebaseService.getAllExperiences.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getAllProjects.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getAllArticles.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getAchievements.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getCertificates.and.returnValue(Promise.resolve([]));

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
