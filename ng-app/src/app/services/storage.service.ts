import { Injectable } from '@angular/core';
import { Entry } from './models/Entry';
import { Map } from './models/Map';
import * as cloner from 'lodash';
import { Dino } from './models/Dino';
import { Stats } from './models/Stats';
import { GameIni } from './models/GameIni';
import { CustomLevel } from './models/CustomLevel';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setModsPath(modsPath: String): void {
    localStorage.setItem('modsPath', modsPath.toString());
  }

  public getModsPath(): String {
    const modsPath = localStorage.getItem('modsPath');
    return (modsPath) ? modsPath : '';
  }

  public setModsIds(modsIds: String): void {
    localStorage.setItem('modsIds', modsIds.toString());
  }

  public getModsIds(): String {
    const modsIds = localStorage.getItem('modsIds');
    return (modsIds) ? modsIds : '';
  }

  public setSpawnEntries(map: Map): void {
    localStorage.setItem(map.name.toString(), JSON.stringify(map.entries));
  }

  public getSpawnEntries(map: Map): Array<Entry> {
    const _map = cloner.cloneDeep(map);
    _map.resetDinos();
    const spawnEntries = JSON.parse(localStorage.getItem(map.name.toString()));
    if (spawnEntries) {
      _map.entries = spawnEntries.map((_entry: Entry) => {
        return new Entry(_entry.name, _entry.dinos.map((_dino) => {
          const dino = new Dino(_dino.name);
          dino.limit = _dino.limit;
          dino.weight = _dino.weight;
          dino.checked = _dino.checked;
          return dino;
        }));
      });
    }
    return _map.entries;
  }

  public setStats(stats: Stats): void {
    localStorage.setItem(stats.name.toString() + 'Stats', JSON.stringify(stats));
  }

  public getStats(stats: Stats): Stats {
    return new Stats(stats.name).load(JSON.parse(localStorage.getItem(stats.name + 'Stats')));
  }

  public setGameIniConfig(config: GameIni): void {
    localStorage.setItem('gameIni', JSON.stringify(config));
  }

  public getGameIniConfig(): GameIni {
    return new GameIni().load(JSON.parse(localStorage.getItem('gameIni')));
  }

  public getCustomLevelConfig(customLevel: CustomLevel): CustomLevel {
    return new CustomLevel(customLevel.name).load(JSON.parse(localStorage.getItem(customLevel.name + 'CustomLevel')));
  }

  public setCustomLevelConfig(customLevel: CustomLevel): void {
    localStorage.setItem(customLevel.name + 'CustomLevel', JSON.stringify(customLevel));
  }



}
