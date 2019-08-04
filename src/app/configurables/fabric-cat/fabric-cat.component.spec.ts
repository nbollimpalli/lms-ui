import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricCatComponent } from './fabric-cat.component';

describe('FabricCatComponent', () => {
  let component: FabricCatComponent;
  let fixture: ComponentFixture<FabricCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
