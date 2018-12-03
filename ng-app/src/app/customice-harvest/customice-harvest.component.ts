import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Harvest } from '../services/models/Harvest';
import { ModalOutputConfigComponent } from '../modals/modal-output-config/modal-output-config.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-customice-harvest',
  templateUrl: './customice-harvest.component.html',
  styleUrls: ['./customice-harvest.component.scss']
})
export class CustomiceHarvestComponent implements OnInit {

  private harvest: Harvest;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.harvest = this.dataService.getHarvest();
  }

  public generate(): void {
    if (this.harvest.validate()) {
      this.dialog.open(ModalOutputConfigComponent, {
        height: '600px',
        width: '900px',
        data: {
          config: this.harvest.toDataConfig(),
          object: this.harvest,
          fileName: 'CustomHarvest'
        },
        hasBackdrop: true
      });
    } else {
      alert('BAD Config');
    }
  }
  public import(): void {
    const element: HTMLElement = document.getElementById('file') as HTMLElement;
    element.click();
  }

  public onloadConfig($event): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => {
      return (e) => {
        const b = e.target.result.split(',')[1];
        const harvest = new Harvest().load(JSON.parse(atob(b)));
        if (harvest.validate()) {
          setTimeout(() => {
            this.harvest = harvest;
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
