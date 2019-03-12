import { Dino } from './Dino';
import * as cloner from 'lodash';

export class Entry {

  public name: string;
  public dinos: Array<Dino>;
  public active: Boolean;

  constructor(
    private _name: string,
    private _dinos: Array<any>
  ) {
    this.name = _name;
    this.dinos = <Array<Dino>>_dinos;
    this.active = false;
  }

  public checkDino(dino: Dino): void {
    if (!this.isDinoInEntry(dino)) {
      this.addDino(dino.clone());
    } else {
      this.removeDino(dino);
    }
  }

  public addDino(dino: Dino): void {
    this.dinos.push(dino);
  }

  public removeDino(dino: Dino): void {
    this.dinos = this.dinos.filter((_dino) => {
      return (_dino.name !== dino.name);
    });
  }

  public isDinoInEntry(dino: Dino): Boolean {
    return (this.dinos.filter((_dino) => {
      return (_dino.name === dino.name);
    }).length === 1);
  }

  public resetDinos(): void {
    this.dinos = [];
  }

  public toDataConfig(): String {
    if (this.dinos.length > 0) {
      let dataConfig = 'ConfigAddNPCSpawnEntriesContainer=(NPCSpawnEntriesContainerClassString="' + this.name + '",NPCSpawnEntries=(';
      let NPCSpawnEntries = '';
      let NPCSpawnLimits = '';
      this.dinos.forEach((dino, i, dinos) => {
        NPCSpawnEntries += dino.getNPCSpawnEntrie() + ((i < dinos.length - 1) ? ',' : '');
        NPCSpawnLimits += dino.getNPCSpawnLimit() + ((i < dinos.length - 1) ? ',' : '');
      });
      dataConfig += NPCSpawnEntries + '),NPCSpawnLimits=(' + NPCSpawnLimits + '))\n';
      return dataConfig;
    } else {
      return '';
    }
  }

  public validate(): Boolean {
    return (this.dinos.filter((dino) => {
      return (dino.validate() !== true);
    }).length === 0 && this.validateName());
  }

  public validateName(): Boolean {
    return (
      this.name !== undefined &&
      this.name !== null &&
      this.name !== '' &&
      this.name.toUpperCase().trim().indexOf('Spawn'.toUpperCase()) > -1
    );
  }

  public clear(): Entry {
    const entry: Entry = this.clone();
    entry.dinos = entry.dinos.map((d) => {
      return d.clear();
    });
    delete entry._name;
    delete entry._dinos;
    return entry;
  }

  public clone(): Entry {
    return cloner.cloneDeep(this);
  }

}
