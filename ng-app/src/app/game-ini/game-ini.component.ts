import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GameIni } from '../services/models/GameIni';
import { ModalOutputConfigComponent } from '../modals/modal-output-config/modal-output-config.component';

@Component({
  selector: 'app-game-ini',
  templateUrl: './game-ini.component.html',
  styleUrls: ['./game-ini.component.scss']
})
export class GameIniComponent implements OnInit {

  public config = new GameIni();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() { }

  public generate(): void {
    this.dialog.open(ModalOutputConfigComponent, {
      height: '600px',
      width: '900px',
      data: {
        config: this.config.toDataConfig(),
        object: this.config
      },
      hasBackdrop: true
    });
  }

  public importConfig(): void {
    const element: HTMLElement = document.getElementById('file') as HTMLElement;
    element.click();
  }

  public onloadConfig($event): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => {
      return (e) => {
        const b = e.target.result.split(',')[1];
        const gameIni = new GameIni().load(JSON.parse(atob(b)));
        if (gameIni.validate()) {
          setTimeout(() => {
            this.config = gameIni;
          }, 100);
        } else {
          alert('BAD FILE');
        }
        document.getElementById('file').setAttribute('value', '');

      };
    })();
    reader.readAsDataURL(file);
  }

}
