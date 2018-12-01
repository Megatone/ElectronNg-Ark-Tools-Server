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
import { OutputSpawnConfigComponent } from './modal/output-spawn-config/output-spawn-config.component';


@Component({
  selector: 'app-customice-spawns',
  templateUrl: './customice-spawns.component.html',
  styleUrls: ['./customice-spawns.component.scss']
})
export class CustomiceSpawnsComponent implements OnInit {

  private mods_path: String = '';
  private mods_BASE: Array<Mod> = [];
  private mods: Array<Mod> = [];
  private maps: Array<Map>;
  private map: Map;
  private map_spawn: Map;
  private filter: String = '';
  private mods_loaded: Boolean = false;
  private mods_ids: String = '';
  private active_entry_name: String;

  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private _electronService: ElectronService,
    private storage: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.maps = this.dataService.getMaps();
    this.map = this.maps[0];
    this.active_entry_name = this.map.entries[0].name;
    this.mods_BASE = this.dataService.getDefaultMods();
    this.mods = cloner.cloneDeep(this.mods_BASE);
    this.mods_loaded = true;
    this.map_spawn = new Map(this.map.name);
    this.map_spawn.entries = this.storage.getSpawnEntries(this.map);
    this.mods_path = this.storage.getModsPath();
    this.mods_ids = this.storage.getModsIds();
    this.resetChecks();
  }

  public selectModsPath(): void {
    if (this._electronService.isElectronApp) {
      this.mods_path = this._electronService.ipcRenderer.sendSync('getPath');
      this.storage.setModsPath(this.mods_path);
    }
  }

  public setEntryState(entry: Entry, state: Boolean): void {
    if (state && this.active_entry_name !== entry.name) {

      this.active_entry_name = entry.name;
      this.resetChecks();

    } else if (!state && this.active_entry_name === entry.name) {
      this.active_entry_name = '';
    }
  }

  public resetChecks(): void {
    this.mods.forEach((mod) => {
      mod.dinos.forEach((dino) => {
        dino.checked = this.getActiveSpawnEntry().isDinoInEntry(dino);
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
    if (this.active_entry_name !== '') {
      this.getActiveSpawnEntry().checkDino(dino);
      this.storage.setSpawnEntries(this.map_spawn);
    }
  }

  public removeDino(dino: Dino) {
    this.checkDino(dino);
    this.resetChecks();
  }

  public getActiveSpawnEntry(): Entry {
    return this.map_spawn.getEntry(this.active_entry_name);
  }

  public getActiveMapEntry(): Entry {
    return this.map.getEntry(this.active_entry_name);
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
      this.dialog.open(OutputSpawnConfigComponent, {
        height: '600px',
        width: '900px',
        data: { map: this.map_spawn },
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
    reader.onload = ((theFile, map_spawn) => {
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
    })(file, this.map_spawn);
    reader.readAsDataURL(file);
  }
}
