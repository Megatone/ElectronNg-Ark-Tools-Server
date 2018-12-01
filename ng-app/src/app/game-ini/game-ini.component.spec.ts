import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIniComponent } from './game-ini.component';

describe('GameIniComponent', () => {
  let component: GameIniComponent;
  let fixture: ComponentFixture<GameIniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameIniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameIniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
