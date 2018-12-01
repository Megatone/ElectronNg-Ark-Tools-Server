import { Dino } from './Dino';

export class Mod {
  public name: String;
  public id: String;
  public path: string;
  public dinos: Array<Dino>;

  constructor(_id: String) {
    this.id = _id;
    this.dinos = [];
  }
}
