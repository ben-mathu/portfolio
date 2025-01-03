import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { MyDetails } from 'src/app/shared/models/header/header';
import { RouterModule } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'getHeader', 'getAllExperiences', 'getAllProjects', 'getCertificates', 'getAchievements'
    ]);
    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [ HomePageComponent ],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    mockFirebaseService.getHeader.and.returnValue(Promise.resolve(new MyDetails()));
    mockFirebaseService.getAllExperiences.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getAllProjects.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getCertificates.and.returnValue(Promise.resolve([]));
    mockFirebaseService.getAchievements.and.returnValue(Promise.resolve([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
