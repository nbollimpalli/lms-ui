import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricCatsComponent } from './fabric-cats.component';

describe('FabricCatsComponent', () => {
  let component: FabricCatsComponent;
  let fixture: ComponentFixture<FabricCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
