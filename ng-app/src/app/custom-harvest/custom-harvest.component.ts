import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Harvest } from '../services/models/Harvest';
import { Subscription } from 'rxjs';
import { AssistantService } from '../services/assistant.service';

@Component({
  selector: 'app-custom-harvest',
  templateUrl: './custom-harvest.component.html',
  styleUrls: ['./custom-harvest.component.scss']
})
export class CustomHarvestComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  private harvest: Harvest;
  private loaded: Boolean = false;

  constructor(
    private dataService: DataService,
    private assistantService: AssistantService
  ) {
  }

  ngOnInit() {
    this.subscription = this.assistantService.order$.subscribe((order) => {
      this.assistantService.confirm(order);
    });
    this.dataService.getHarvestJSON().then((harvest) => {
      this.harvest = harvest;
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
