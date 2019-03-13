import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AssistantService } from '../services/assistant.service';
import { CustomLevel } from '../services/models/CustomLevel';

@Component({
  selector: 'app-custom-level',
  templateUrl: './custom-level.component.html',
  styleUrls: ['./custom-level.component.scss']
})
export class CustomLevelComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public player: CustomLevel = new CustomLevel('Players');
  public dino: CustomLevel = new CustomLevel('Dinos');

  private chartConfig = {
    lineChartLegend: true,
    lineChartType: 'line',
    lineChartOptions: {
      responsive: true,
      scales: {
        xAxes: [{}],
        yAxes: [
          {
            id: 'y-axis-0',
            position: 'left',
          }
        ]
      }
    },
    lineChartColors: [
      {
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(63, 81, 181,1)',
        pointBackgroundColor: 'rgb(63, 81, 181,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ]
  };

  constructor(
    private storage: StorageService,
    private assistantService: AssistantService
  ) {
  }

  ngOnInit() {
    this.player = this.storage.getCustomLevelConfig(this.player);
    this.dino = this.storage.getCustomLevelConfig(this.dino);
    this.subscription = this.assistantService.order$.subscribe((order) => {
      this.storage.setCustomLevelConfig(this.player);
      this.storage.setCustomLevelConfig(this.dino);
      this.assistantService.confirm(order);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
