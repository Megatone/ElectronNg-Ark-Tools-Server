import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Map } from '../services/models/Map';
import { NgxSpinnerService } from 'ngx-spinner';
import { Entry } from '../services/models/Entry';
import { Mod } from '../services/models/Mod';
import { Dino } from '../services/models/Dino';
import { ElectronService } from 'ngx-electron';
import { StorageService } from '../services/storage.service';
import * as cloner from 'lodash';
import { MatDialog } from '@angular/material';
import { ModalOutputConfigComponent } from '../modals/modal-output-config/modal-output-config.component';



@Component({
  selector: 'app-custom-spawns',
  templateUrl: './custom-spawns.component.html',
  styleUrls: ['./custom-spawns.component.scss']
})
export class CustomSpawnsComponent implements OnInit {

  private allLoaded: Boolean = false;
  private mods_loaded: Boolean = false;
  private mods_path: String = '';
  private mods_BASE: Array<Mod> = [];
  private mods: Array<Mod> = [];
  private maps: Array<Map>;
  private map: Map;
  private map_spawn: Map;
  private filter: String = '';
  private mods_ids: String = '';

  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _electronService: ElectronService,
    private storage: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.dataService.getMapsJSON().then((maps) => {
      this.maps = maps;
      this.map = this.maps[0];
      this.map_spawn = this.map.clone().resetDinos();
      this.mods_loaded = true;
      this.mods_path = this.storage.getModsPath();
      this.mods_ids = this.storage.getModsIds();
      this.allLoaded = true;
      this.spinner.hide();
    });
  }

  public selectModsPath(): void {
    if (this._electronService.isElectronApp) {
      this.mods_path = this._electronService.ipcRenderer.sendSync('getPath');
      this.storage.setModsPath(this.mods_path);
    }
  }

  public setEntryState(entry: Entry, state: Boolean): void {
    this.map.setAcctiveEntry(entry, state);
    this.map_spawn.setAcctiveEntry(entry, state);
    this.resetChecks();
  }

  public resetChecks(): void {
    const activeSpawnEntry = this.map_spawn.getActiveEntry();
    this.mods.forEach((mod) => {
      mod.dinos.forEach((dino) => {
        dino.checked = activeSpawnEntry ? activeSpawnEntry.isDinoInEntry(dino) : false;
      });
    });
  }

  public loadMods(): void {
    this.spinner.show();
    this.storage.setModsIds(this.mods_ids);
    setTimeout(() => {
      this.mods_BASE = this.dataService.getMods(this.mods_path, this.mods_ids.split(','));
      this.mods = this.cloneMods();
      this.resetChecks();
      this.mods_loaded = true;
      this.spinner.hide();
    }, 100);
  }

  public setFilter(dino: String): void {
    this.filter = dino;
    this.filterChange(this.filter);
  }

  public checkDino(dino: Dino): void {
    this.map_spawn.getActiveEntry().checkDino(dino);
  }

  public removeDino(dino: Dino) {
    this.checkDino(dino);
    this.resetChecks();
  }


  public filterChange(event): void {
    this.spinner.show();
    setTimeout(() => {
      if (this.filter === '') {
        this.mods = this.cloneMods();
      } else {
        this.mods = this.cloneMods().filter((mod) => {
          mod.dinos = mod.dinos.filter((dino) => {
            return (dino.name.toUpperCase().trim().indexOf(this.filter.toUpperCase().trim()) > -1);
          });
          return (mod.dinos.length > 0);
        });
      }
      this.resetChecks();
      this.spinner.hide();
    }, 10);
  }

  public generate(): void {
    if (this.map_spawn.validateDataConfig()) {
      this.storage.setSpawnEntries(this.map_spawn);
      this.dialog.open(ModalOutputConfigComponent, {
        height: '600px',
        width: '900px',
        data: {
          config: this.map_spawn.toDataConfig(),
          object: this.map_spawn.clear(),
          fileName: 'CustomSpawns'
        },
        hasBackdrop: true
      });
    } else {
      alert('BAD Config');
    }
  }

  public cloneMods(): Array<Mod> {
    return cloner.cloneDeep(this.mods_BASE);
  }

  public importConfig(): void {
    const element: HTMLElement = document.getElementById('file') as HTMLElement;
    element.click();
  }

  public onloadConfig($event): void {
    const file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = (() => {
      return (e) => {
        const b = e.target.result.split(',')[1];
        const map = new Map('').load(JSON.parse(atob(b)));
        if (map.validateDataConfig() && map.entries.length > 0) {
          setTimeout(() => {
            this.map_spawn = map;
            this.resetChecks();
          }, 100);

        } else {
          alert('BAD FILE');
        }
        document.getElementById('file').setAttribute('value', '');

      };
    })();
    reader.readAsDataURL(file);
  }

  public mapChanged(map) {
    this.allLoaded = false;
    this.spinner.show();
    setTimeout(() => {
      this.map_spawn = this.map.clone().resetDinos();
      this.allLoaded = true;
      this.resetChecks();
      this.spinner.hide();
    }, 1000);

  }
}
