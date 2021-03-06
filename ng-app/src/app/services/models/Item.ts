export class Item {

  public name: String;
  public tag: String;
  public multiplier: Number;
  public type: String;
  public img: String;

  public constructor(
    private _img: String,
    private _name: String,
    private _tag: String,
    private _type: String,
    private _multiplier: Number = 1
  ) {
      this.img = this._img,
      this.name = this._name,
      this.tag = this._tag;
      this.type = this._type;
      this.multiplier = this._multiplier;
  }

  public validate(): Boolean {
    return (
      this.validateString(this.img) &&
      this.validateString(this.name) &&
      this.validateString(this.tag) &&
      this.validateString(this.type) &&
      this.validateMultiplier()
    );
  }
  
  public validateMultiplier(): Boolean {
    return (this.multiplier !== undefined && this.multiplier !== null && this.multiplier > 0);
  }

  private validateString(value: String): Boolean {
    return (value !== undefined && value !== null && value !== '');
  }

  public toDataConfig(): String {
    return 'HarvestResourceItemAmountClassMultipliers=(ClassName="' + this.tag + '",Multiplier=' + this.multiplier + ')';
  }

}
