export class Dino {

  public name: String;
  public checked: Boolean;
  public weight: Number;
  public limit: Number;

  constructor(private _name: String) {
    this.name = _name;
    this.checked = false;
    this.weight = 0.5;
    this.limit = 0.00001;
  }

  public getNPCSpawnEntrie(): String {
    return '(AnEntryName="spawn' + new Date().getTime() + '",EntryWeight=' + this.weight + ',NPCsToSpawnStrings=("' + this.name + '"))';
  }

  public getNPCSpawnLimit(): String {
    return '(NPCClassString="' + this.name + '",MaxPercentageOfDesiredNumToAllow=' + this.limit + ')';
  }

  public validate(): Boolean {
    return (
      this.validateName() &&
      this.validateWeight() &&
      this.validateLimit()
    );
  }

  public validateName(): Boolean {
    return (
      this.name !== undefined &&
      this.name !== null &&
      this.name !== ''
    );
  }

  public validateWeight(): Boolean {
    return (
      this.weight !== undefined &&
      this.weight !== null &&
      this.weight > 0
    );
  }

  public validateLimit(): Boolean {
    return (
      this.limit !== undefined &&
      this.limit !== null &&
      this.limit > 0
    );
  }
}
