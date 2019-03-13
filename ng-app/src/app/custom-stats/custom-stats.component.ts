import { Component, OnInit, OnDestroy } from '@angular/core';
import { Stats } from '../services/models/Stats';
import { StorageService } from '../services/storage.service';
import { Subscription } from 'rxjs';
import { AssistantService } from '../services/assistant.service';

@Component({
  selector: 'app-custom-stats',
  templateUrl: './custom-stats.component.html',
  styleUrls: ['./custom-stats.component.scss']
})
export class CustomStatsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private human_stats = new Stats('Player');
  private dino_tamed_stats = new Stats('DinoTamed');
  private dino_wild_stats = new Stats('DinoWild');

  constructor(
    private storage: StorageService,
    private assistantService: AssistantService
  ) { }

  ngOnInit() {
    this.human_stats = this.storage.getStats(this.human_stats);
    this.dino_tamed_stats = this.storage.getStats(this.dino_tamed_stats);
    this.dino_wild_stats = this.storage.getStats(this.dino_wild_stats);
    this.subscription =  this.assistantService.order$.subscribe((order) => {
      this.storage.setStats(this.human_stats);
      this.storage.setStats(this.dino_tamed_stats);
      this.storage.setStats(this.dino_wild_stats);
      this.assistantService.confirm(order);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
