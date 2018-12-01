import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputSpawnConfigComponent } from './output-spawn-config.component';

describe('OutputSpawnConfigComponent', () => {
  let component: OutputSpawnConfigComponent;
  let fixture: ComponentFixture<OutputSpawnConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputSpawnConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputSpawnConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
