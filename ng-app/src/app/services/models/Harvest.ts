import { Item } from './Item';

export class Harvest {

  public resources: Array<Item>;
  public consumables: Array<Item>;
  public seeds: Array<Item>;

  public constructor() {
    this.resources = [];
    this.consumables = [];
    this.seeds = [];
  }

  public load(harvest: Harvest): Harvest {
    for (const key in this) {
      if (harvest.hasOwnProperty(key)) {
        this[key] = <any>harvest[<any>key].map((item: Item) => {
          return new Item(item.img, item.name, item.tag, item.type, item.multiplier);
        });
      }
    }
    return this.validate() ? this : new Harvest();
  }

  public validate(): Boolean {
    return (
      this.validateItems(this.resources) &&
      this.validateItems(this.consumables) &&
      this.validateItems(this.seeds)
    );
  }

  private validateItems(items: Array<Item>): Boolean {
    return items.filter((item) => {
      return item.validate() !== true;
    }).length === 0;
  }

  public toDataConfig(): String {
    let dataConfig = this.resources.map((r) => {
      return r.toDataConfig();
    }).join('\n');

    dataConfig += this.consumables.map((r) => {
      return r.toDataConfig();
    }).join('\n');

    dataConfig += this.seeds.map((r) => {
      return r.toDataConfig();
    }).join('\n');

    return dataConfig;
  }
}
