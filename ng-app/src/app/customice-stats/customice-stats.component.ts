import { Component, OnInit } from '@angular/core';
import { Stats } from '../services/models/Stats';
import { StorageService } from '../services/storage.service';
import { OutputCustomStatsComponent } from './modal/output-custom-stats/output-custom-stats.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-customice-stats',
  templateUrl: './customice-stats.component.html',
  styleUrls: ['./customice-stats.component.scss']
})
export class CustomiceStatsComponent implements OnInit {

  private human_stats = new Stats('Player');
  private dino_tamed_stats = new Stats('DinoTamed');
  private dino_wild_stats = new Stats('DinoWild');

  constructor(
    private storage: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.human_stats = this.storage.getStats(this.human_stats);
    this.dino_tamed_stats = this.storage.getStats(this.dino_tamed_stats);
    this.dino_wild_stats = this.storage.getStats(this.dino_wild_stats);
  }

  public generate(): void {
    if (
      this.human_stats.validate() &&
      this.dino_tamed_stats.validate() &&
      this.dino_wild_stats.validate()
    ) {
      this.storage.setStats(this.human_stats);
      this.storage.setStats(this.dino_tamed_stats);
      this.storage.setStats(this.dino_wild_stats);
      this.dialog.open(OutputCustomStatsComponent, {
        height: '600px',
        width: '900px',
        data: {
          stats: [
            this.human_stats,
            this.dino_tamed_stats,
            this.dino_wild_stats
          ]
        },
        hasBackdrop: true
      });
    } else {
      alert('BAD Config');
    }
  }

}
