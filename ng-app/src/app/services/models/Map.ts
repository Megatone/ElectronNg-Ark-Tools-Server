import { Entry } from './Entry';
import { Dino } from './Dino';
import * as cloner from 'lodash';

export class Map {

  public name: String;
  public entries: Array<Entry>;
  private activeEntry: Entry;

  constructor(private _name: String) {
    this.name = _name;
    this.entries = <Array<Entry>>[];
  }

  public getActiveEntry(): Entry {
    return this.activeEntry;
  }

  public setAcctiveEntry(entry: Entry, state: Boolean): void {
    const _entry = this.entries.filter((e) => {
      return e.name === entry.name;
    })[0];
    if (_entry) {
      _entry.active = state;
      if (state === true) {
        this.activeEntry = _entry;
      } else if (this.activeEntry && this.activeEntry.name === entry.name) {
        this.activeEntry = undefined;
      }
    }
  }

  public resetDinos(): Map {
    this.entries.forEach(entry => {
      entry.resetDinos();
    });
    return this;
  }

  public validateDataConfig(): Boolean {
    return this.entries.filter((entry) => {
      return (entry.validate() !== true);
    }).length === 0;
  }

  public toDataConfig(): String {
    let dataConfig = '';
    this.entries.forEach((entry) => {
      dataConfig += entry.toDataConfig();
    });
    return dataConfig;
  }

  public load(map: any): Map {
    try {
      const _map = <Map>map;
      this.name = <String>_map.name;
      this.entries = _map.entries.map((_entry) => {
        return new Entry(_entry.name, _entry.dinos.map((_dino) => {
          const dino = new Dino(_dino.name);
          dino.checked = _dino.checked;
          dino.weight = _dino.weight;
          dino.limit = _dino.limit;
          return dino;
        }));
      });
    } catch (err) { }

    return this;
  }

  public clear(): Map {
    const map: Map = this.clone();
    map.entries = map.entries.map((e) => {
      return e.clear();
    });

    delete map._name;
    return map;
  }

  public clone(): Map {
    return cloner.cloneDeep(this);
  }

}
