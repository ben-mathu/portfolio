import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsComponent } from './achievements.component';
import { RouterModule } from '@angular/router';
import { Database, getDatabase, provideDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FirestoreModule } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { of } from 'rxjs';
import { AchievementElement } from 'src/app/shared/models/header/portfolio.dto';
import { Utils } from 'src/app/shared/utils/utils';

describe('AchievementsComponent', () => {
  let component: AchievementsComponent;
  let fixture: ComponentFixture<AchievementsComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['getAchievements']);

    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [AchievementsComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    mockFirebaseService.getAchievements.and.returnValue(Promise.resolve([]));

    fixture = TestBed.createComponent(AchievementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
