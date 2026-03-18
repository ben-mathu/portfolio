import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCertificateComponent } from './add-certificate.component';
import { RouterModule } from '@angular/router';
import { Utils } from 'src/app/shared/utils/utils';
import { FirebaseService } from 'src/app/shared/services/firebase/firebase.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddCertificateComponent', () => {
  let component: AddCertificateComponent;
  let fixture: ComponentFixture<AddCertificateComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'updateCertificate',
      'saveCertificate',
      'deleteCertificate',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [AddCertificateComponent],
      providers: [
        Utils,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
