import { Injectable } from '@angular/core';
import { Map } from './models/Map';
import { Entry } from './models/Entry';
import { FsService } from 'ngx-fs';
import { Mod } from './models/Mod';
import { Dino } from './models/Dino';
import { Harvest } from './models/Harvest';
import { Item } from './models/Item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private fs: FsService,
    private http: HttpClient
  ) { }

  public getMods(dir: String, modIds: Array<String>): Array<Mod> {
    return modIds.map((modId) => {
      const mod = new Mod(modId);
      mod.path = dir.toString() + '/' + mod.id.toString();
      mod.name = this.getModName(mod.path);
      if (mod.name !== '') {
        mod.dinos = this.getCreaturesAsync(mod.path);
      }
      if (mod.dinos.length > 0) {
        return mod;
      }
    }).filter((mod) => {
      return mod !== undefined;
    });
  }

  public getModName(dir: string): String {
    let name = '';
    try {
      if (this.fs.isElectronApp) {
        (<any>this.fs.fs).readdirSync(dir).forEach((file) => {
          if (file.indexOf('.umap') > -1) {
            name = file.split('.umap')[0];
          }
        });
      }
    } catch (err) {
      name = 'error_load';
    }
    return name;
  }

  public getCreaturesAsync(dir, dinos: Array<Dino> = []): Array<Dino> {
    try {
      if (this.fs.isElectronApp) {
        const files = (<any>this.fs.fs).readdirSync(dir);
        dinos = dinos || [];
        for (const file in files) {
          if ((<any>this.fs.fs).statSync(dir + '/' + files[file]).isDirectory()) {
            dinos = this.getCreaturesAsync(dir + '/' + files[file], dinos);
          } else {
            if (files[file].indexOf('.uasset') > -1 && files[file].indexOf('_Character_') > -1) {
              dinos.push(new Dino(files[file].replace('.uasset', '_c')));
            }
          }
        }
        return dinos;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }

  public getMapsJSON(): Promise<Array<Map>> {
    return new Promise(resolve => {
      this.http.get('./assets/data/maps.json').subscribe((maps: Array<Map>) => {
        resolve(maps.map((_map) => {
          const map = new Map(_map.name);
          map.entries = _map.entries.map((_entry) => {
            return new Entry(_entry.name, _entry.dinos.map((_dino) => {
              return new Dino(_dino.toString());
            }));
          });
          return map;
        }));
      });
    });
  }

  public getHarvestJSON(): Promise<Harvest> {
    return new Promise(resolve => {
      this.http.get('./assets/data/items.json').subscribe((_items: Array<Item>) => {
        const harvest = new Harvest();
        const items = _items.map((_item) => {
          return new Item(_item.img, _item.name, _item.tag, _item.type, _item.multiplier);
        });
        harvest.resources = items.filter((i) => {
          return i.type === 'resources';
        });
        harvest.consumables = items.filter((i) => {
          return i.type === 'consumables';
        });
        harvest.seeds = items.filter((i) => {
          return i.type === 'seeds';
        });
        resolve(harvest);
      });
    });
  }

}
