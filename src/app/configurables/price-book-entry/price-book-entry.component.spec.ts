import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBookEntryComponent } from './price-book-entry.component';

describe('PriceBookEntryComponent', () => {
  let component: PriceBookEntryComponent;
  let fixture: ComponentFixture<PriceBookEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceBookEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBookEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
