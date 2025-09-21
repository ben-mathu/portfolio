import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared.module';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

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
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compileComponents();
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
