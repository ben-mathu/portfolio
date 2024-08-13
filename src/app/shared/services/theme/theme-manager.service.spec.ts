import { TestBed } from '@angular/core/testing';

import { ThemeManagerService } from './theme-manager.service';

describe('ThemeService', () => {
  let service: ThemeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
