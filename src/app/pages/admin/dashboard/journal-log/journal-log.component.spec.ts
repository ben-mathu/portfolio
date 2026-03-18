import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalLogComponent } from './journal-log.component';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { Utils } from 'src/app/shared/utils/utils';
import { RouterModule } from '@angular/router';

describe('JournalLogComponent', () => {
  let component: JournalLogComponent;
  let fixture: ComponentFixture<JournalLogComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'getJournal'
    ]);
    await TestBed.configureTestingModule({
      imports: [ RouterModule.forRoot([]) ],
      declarations: [JournalLogComponent],
      providers: [
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ]
    })
    .compileComponents();

    mockFirebaseService.getJournal.and.returnValue(Promise.resolve([]))

    fixture = TestBed.createComponent(JournalLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
