import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAchievementComponent } from './add-achievement.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/components/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddAchievementComponent', () => {
  let component: AddAchievementComponent;
  let fixture: ComponentFixture<AddAchievementComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'updateAchievement',
      'saveAchievement',
      'deleteAchievement',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatFormFieldModule,
        SharedModule,
        ReactiveFormsModule,
        MarkdownModule.forRoot(),
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddAchievementComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
