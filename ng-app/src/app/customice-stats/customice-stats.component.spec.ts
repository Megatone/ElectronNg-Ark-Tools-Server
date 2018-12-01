import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiceStatsComponent } from './customice-stats.component';

describe('CustomiceStatsComponent', () => {
  let component: CustomiceStatsComponent;
  let fixture: ComponentFixture<CustomiceStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomiceStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiceStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
