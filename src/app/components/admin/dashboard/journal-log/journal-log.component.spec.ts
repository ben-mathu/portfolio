import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalLogComponent } from './journal-log.component';

describe('JournalLogComponent', () => {
  let component: JournalLogComponent;
  let fixture: ComponentFixture<JournalLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JournalLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
