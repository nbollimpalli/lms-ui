import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBookEntriesComponent } from './price-book-entries.component';

describe('PriceBookEntriesComponent', () => {
  let component: PriceBookEntriesComponent;
  let fixture: ComponentFixture<PriceBookEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceBookEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBookEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
