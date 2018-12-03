import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiceSpawnsComponent } from './custom-spawns.component';

describe('CustomiceSpawnsComponent', () => {
  let component: CustomiceSpawnsComponent;
  let fixture: ComponentFixture<CustomiceSpawnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomiceSpawnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiceSpawnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
