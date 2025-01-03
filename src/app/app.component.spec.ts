import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { FirebaseService } from './shared/services/firebase/firebase.service';
import { MyDetails } from './shared/models/header/header';
import { Utils } from './shared/utils/utils';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

describe('AppComponent', () => {
  beforeEach(async () => {
    let mockFirebaseService = jasmine.createSpyObj('FirebaseService', [ 'getHeader', 'getAuth', 'onAuthStateChanged' ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideDatabase(() => getDatabase()),
      ],
      providers: [
        provideRouter(
          [{path: 'home', component: HomeComponent}, {path: 'admin', component: AdminComponent}]
        ),
        {
          provide: FirebaseService,
          useValue: mockFirebaseService
        }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    mockFirebaseService.getHeader.and.returnValue(Promise.resolve(new MyDetails()));
    mockFirebaseService.onAuthStateChanged.and.returnValue(Promise.resolve());
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
