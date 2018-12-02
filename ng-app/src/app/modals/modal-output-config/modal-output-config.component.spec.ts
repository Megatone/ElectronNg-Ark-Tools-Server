import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOutputConfigComponent } from './modal-output-config.component';

describe('ModalOutputConfigComponent', () => {
  let component: ModalOutputConfigComponent;
  let fixture: ComponentFixture<ModalOutputConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOutputConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOutputConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
