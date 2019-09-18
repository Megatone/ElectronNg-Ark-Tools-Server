import { Component, OnInit, Input } from '@angular/core';
import { EngramsLevels } from 'src/app/services/models/EngramsLevels';

@Component({
  selector: 'app-engrams-chart',
  templateUrl: './engrams-chart.component.html',
  styleUrls: ['./engrams-chart.component.scss']
})
export class EngramsChartComponent implements OnInit {

  @Input() engramsLevel: EngramsLevels;

  private chartConfig: any = {
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

  constructor() { }

  ngOnInit() {
  }

}
