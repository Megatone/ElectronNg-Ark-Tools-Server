import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiceEngramsComponent } from './customice-engrams.component';

describe('CustomiceEngramsComponent', () => {
  let component: CustomiceEngramsComponent;
  let fixture: ComponentFixture<CustomiceEngramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomiceEngramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiceEngramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
