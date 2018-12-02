import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import saveAs from 'file-saver';
@Component({
  selector: 'app-modal-output-config',
  templateUrl: './modal-output-config.component.html',
  styleUrls: ['./modal-output-config.component.scss']
})
export class ModalOutputConfigComponent  {

  private config: String = '';
  private object: any;

  @ViewChild('alert') alert: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.config = data.config;
    this.object = data.object;
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
    const blob = new Blob([JSON.stringify(this.object)], { type: 'application/json;charset=utf-8' });
    saveAs(blob, 'Gme_Ini.json');
  }

  public download(): void {
    const blob = new Blob([this.config.toString()], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'Game.ini.txt');
  }

  public closeAlert(): void {
    this.alert.nativeElement.classList.remove('show');
  }

}
