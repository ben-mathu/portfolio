import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleComponent } from './add-article.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { RouterModule } from '@angular/router';

describe('AddArticleComponent', () => {
  let component: AddArticleComponent;
  let fixture: ComponentFixture<AddArticleComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['updateBlog', 'saveBlog', 'deleteBlog']);
    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [AddArticleComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
