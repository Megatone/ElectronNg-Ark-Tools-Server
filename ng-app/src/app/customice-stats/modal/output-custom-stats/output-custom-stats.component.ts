import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Stats } from 'src/app/services/models/Stats';
import saveAs from 'file-saver';

@Component({
  selector: 'app-output-custom-stats',
  templateUrl: './output-custom-stats.component.html',
  styleUrls: ['./output-custom-stats.component.scss']
})
export class OutputCustomStatsComponent implements OnInit {

  public stats: Array<Stats>;

  public config: String = '';

  @ViewChild('alert') alert: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.stats = <Array<Stats>>data.stats;
  }

  ngOnInit(): void {
    this.config += this.stats.map((stat) => {
      return stat.toDataConfig();
    }).join('');
  }

  public copy(inputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.alert.nativeElement.classList.add('show');
    setTimeout(() => {
      this.alert.nativeElement.classList.remove('show');
    }, 10000);
  }

  public export(): void {
    const blob = new Blob([JSON.stringify(this.stats)], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'Custom_stats.json');
  }

  public download(): void {
    const blob = new Blob([this.config.toString()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Custom_stats.ini.txt');
  }

  public closeAlert(): void {
    this.alert.nativeElement.classList.remove('show');
  }

}
