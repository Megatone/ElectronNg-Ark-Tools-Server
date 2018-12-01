import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputCustomStatsComponent } from './output-custom-stats.component';

describe('OutputCustomStatsComponent', () => {
  let component: OutputCustomStatsComponent;
  let fixture: ComponentFixture<OutputCustomStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputCustomStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputCustomStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
