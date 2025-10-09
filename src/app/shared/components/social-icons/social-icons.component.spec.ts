import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialIconsComponent } from './social-icons.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { IconService } from '../../services/icon/icon.service';
import { provideHttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';

export class MatIconRegistryMock {
  addSvgIcon() {
    return this;
  }
  getNamedSvgIcon() {
    return of(document.createElement('svg'));
  }
}

export class DomSanitizerMock {
  bypassSecurityTrustResourceUrl(url: string) {
    return url; // just return the string instead of a real SafeResourceUrl
  }
}

describe('SocialIconsComponent', () => {
  let component: SocialIconsComponent;
  let fixture: ComponentFixture<SocialIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatListModule],
      providers: [provideHttpClient(), IconService],
      declarations: [SocialIconsComponent],
    }).compileComponents();

    TestBed.inject(IconService).registerIcons();

    fixture = TestBed.createComponent(SocialIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 social links', () => {
    const links = fixture.nativeElement.querySelectorAll('a[mat-list-item]');
    expect(links.length).toBe(4);
  });
});
