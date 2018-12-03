import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalOutputConfigComponent } from '../modals/modal-output-config/modal-output-config.component';
import { GameUserSettings } from '../services/models/GameUserSettings';

@Component({
  selector: 'app-game-user-settings',
  templateUrl: './game-user-settings.component.html',
  styleUrls: ['./game-user-settings.component.scss']
})
export class GameUserSettingsComponent {

  public config: GameUserSettings = new GameUserSettings();

  constructor(
    private dialog: MatDialog
  ) { }

  public generate(): void {
    if (this.config.validate()) {
      this.dialog.open(ModalOutputConfigComponent, {
        height: '600px',
        width: '900px',
        data: {
          config: this.config.toDataConfig(),
          object: this.config,
          fileName : 'GameUserSettings'
        },
        hasBackdrop: true
      });
    }
  }



}
