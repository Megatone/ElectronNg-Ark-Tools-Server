import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameUserSettingsComponent } from './game-user-settings.component';

describe('GameUserSettingsComponent', () => {
  let component: GameUserSettingsComponent;
  let fixture: ComponentFixture<GameUserSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameUserSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
