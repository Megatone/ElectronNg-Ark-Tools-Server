import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AssistantService } from '../services/assistant.service';
import { CustomLevelsEngrams } from '../services/models/CustomLevelsEngrams';

@Component({
  selector: 'app-custom-level',
  templateUrl: './custom-level.component.html',
  styleUrls: ['./custom-level.component.scss']
})
export class CustomLevelComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public customLevelEngrams: CustomLevelsEngrams = new CustomLevelsEngrams();

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
    this.customLevelEngrams = this.storage.getCustomLevelsEngramsConfig();
    this.subscription = this.assistantService.order$.subscribe((order) => {
      this.storage.setCustomLevelsEngramsConfig(this.customLevelEngrams);
      this.assistantService.confirm(order);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
