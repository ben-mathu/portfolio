import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsComponent } from './achievements.component';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { MatTableModule } from '@angular/material/table';

describe('AchievementsComponent', () => {
  let component: AchievementsComponent;
  let fixture: ComponentFixture<AchievementsComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'getAchievements',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), MatTableModule],
      declarations: [AchievementsComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compileComponents();

    mockFirebaseService.getAchievements.and.returnValue(Promise.resolve([]));

    fixture = TestBed.createComponent(AchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
