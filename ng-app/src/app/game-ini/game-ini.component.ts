import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameIni } from '../services/models/GameIni';
import { StorageService } from '../services/storage.service';
import { AssistantService } from '../services/assistant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-ini',
  templateUrl: './game-ini.component.html',
  styleUrls: ['./game-ini.component.scss']
})
export class GameIniComponent implements OnInit, OnDestroy {

  public config = new GameIni();
  private subscription: Subscription;

  constructor(
    private storage: StorageService,
    private assistantService: AssistantService
  ) {
  }

  ngOnInit() {
    this.config = this.storage.getGameIniConfig();
    this.subscription = this.assistantService.order$.subscribe((order) => {
      this.storage.setGameIniConfig(this.config);
      this.assistantService.confirm(order);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
