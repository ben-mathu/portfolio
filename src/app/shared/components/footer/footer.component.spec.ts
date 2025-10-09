import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { Utils } from '../../utils/utils';
import { SharedModule } from '../shared.module';
import { SocialIconsComponent } from '../social-icons/social-icons.component';
import { MatListModule } from '@angular/material/list';
import {
  DomSanitizerMock,
  MatIconRegistryMock,
} from '../social-icons/social-icons.component.spec';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconService } from '../../services/icon/icon.service';
import { provideHttpClient } from '@angular/common/http';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, SharedModule],
      declarations: [FooterComponent],
      providers: [provideHttpClient(), Utils, IconService],
    }).compileComponents();

    TestBed.inject(IconService).registerIcons();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
