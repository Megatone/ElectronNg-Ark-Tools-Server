import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiceHarvestComponent } from './custom-harvest.component';

describe('CustomiceHarvestComponent', () => {
  let component: CustomiceHarvestComponent;
  let fixture: ComponentFixture<CustomiceHarvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomiceHarvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiceHarvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
