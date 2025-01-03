import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './add-project.component';
import { RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'updateProject', 'saveProject', 'deleteProject', 'retrieveContent'
    ])

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatAutocomplete
      ],
      declarations: [ AddProjectComponent ],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    mockFirebaseService.retrieveContent.and.returnValue(Promise.resolve(''))

    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
