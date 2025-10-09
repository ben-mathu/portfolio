import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DomSanitizerMock,
  MatIconRegistryMock,
} from '../social-icons/social-icons.component.spec';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { IconService } from '../../services/icon/icon.service';
import { provideHttpClient } from '@angular/common/http';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [
      'getAuth',
      'signOut',
    ]);
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        SharedModule,
        RouterModule.forRoot([]),
        MatFormFieldModule,
      ],
      declarations: [NavbarComponent],
      providers: [
        provideHttpClient(),
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
        IconService,
      ],
    }).compileComponents();

    TestBed.inject(IconService).registerIcons();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
