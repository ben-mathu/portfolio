import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesComponent } from './articles.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { RouterModule } from '@angular/router';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'getAllArticles'
    ]);
    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [ArticlesComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    mockFirebaseService.getAllArticles.and.returnValue(Promise.resolve([]));

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
