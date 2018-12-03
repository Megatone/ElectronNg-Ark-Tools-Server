import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiceLevelComponent } from './custom-level.component';

describe('CustomiceLevelComponent', () => {
  let component: CustomiceLevelComponent;
  let fixture: ComponentFixture<CustomiceLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomiceLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
