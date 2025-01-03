import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [ 'getAllExperiences', 'getAllProjects' ]);

    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [ ExperienceComponent ],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
