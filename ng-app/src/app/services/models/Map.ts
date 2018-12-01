import { Entry } from './Entry';
import { Dino } from './Dino';

export class Map {

  public name: String;
  public entries: Array<Entry>;

  constructor(private _name: String) {
    this.name = _name;
    this.entries = <Array<Entry>>[];
  }

  public getEntry(entryName): Entry {
    if (entryName !== '') {
      return <Entry>this.entries.filter((_entry) => {
        return (_entry.name === entryName);
      })[0];
    } else {
      return new Entry(entryName, []);
    }
  }

  public resetDinos() {
    this.entries.forEach(entry => {
      entry.resetDinos();
    });
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
}
