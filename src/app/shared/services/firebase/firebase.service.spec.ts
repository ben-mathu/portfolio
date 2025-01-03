import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { Database } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    let mockDatabase = jasmine.createSpyObj('Database', [''])
    let mockHttpClient = jasmine.createSpyObj('HttpClient', ['get'])
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Database,
          useValue: mockDatabase
        },
        {
          provide: HttpClient,
          useValue: mockHttpClient
        }
      ]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
