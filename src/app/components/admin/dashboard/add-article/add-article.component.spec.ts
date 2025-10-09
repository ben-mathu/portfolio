import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleComponent } from './add-article.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddArticleComponent', () => {
  let component: AddArticleComponent;
  let fixture: ComponentFixture<AddArticleComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'updateBlog',
      'saveBlog',
      'deleteBlog',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatFormFieldModule,
        SharedModule,
        MatChipsModule,
        MatInputModule,
        MarkdownModule.forRoot(),
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddArticleComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
