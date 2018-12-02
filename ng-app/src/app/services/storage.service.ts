import { Injectable } from '@angular/core';
import { Entry } from './models/Entry';
import { Map } from './models/Map';
import * as cloner from 'lodash';
import { Dino } from './models/Dino';
import { Stats } from './models/Stats';

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
    localStorage.setItem(stats.name.toString(), JSON.stringify(stats));
  }

  public getStats(stats: Stats): Stats {
    const stats_stored = <Stats>JSON.parse((localStorage.getItem(stats.name.toString())));
    if (stats_stored) {
      stats.Health = stats_stored.Health;
      stats.Stamina = stats_stored.Stamina;
      stats.Torpidity = stats_stored.Torpidity;
      stats.Oxygen = stats_stored.Oxygen;
      stats.Food = stats_stored.Food;
      stats.Water = stats_stored.Water;
      stats.Temperature = stats_stored.Temperature;
      stats.Weight = stats_stored.Weight;
      stats.Melee = stats_stored.Melee;
      stats.Speed = stats_stored.Speed;
      stats.Temperature_Fortitude = stats_stored.Temperature_Fortitude;
      stats.Crafting = stats_stored.Crafting;
    }
    return stats.validate() ? stats : new Stats(stats.name);
  }
}
