import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Map } from 'src/app/services/models/Map';
import saveAs from 'file-saver';

@Component({
  selector: 'app-output-spawn-config',
  templateUrl: './output-spawn-config.component.html',
  styleUrls: ['./output-spawn-config.component.scss']
})
export class OutputSpawnConfigComponent implements OnInit {
  public map: Map;
  public config: String;

  @ViewChild('alert') alert: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.map = <Map>data.map;
  }

  ngOnInit(): void {
    this.config = this.map.toDataConfig();
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
    const blob = new Blob([JSON.stringify(this.map)], { type: 'application/json;charset=utf-8' });
    saveAs(blob, this.map.name + '_spawn_custom.json');
  }

  public download(): void {
    const blob = new Blob([this.config.toString()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, this.map.name + '_spawn_custom.ini.txt');
  }

  public closeAlert(): void {
    this.alert.nativeElement.classList.remove('show');

  }

}
