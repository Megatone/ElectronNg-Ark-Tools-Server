export class Stats {

  public name: String;
  public Health: Number = 1.0;
  public Stamina: Number = 1.0;
  public Torpidity: Number = 1.0;
  public Oxygen: Number = 1.0;
  public Food: Number = 1.0;
  public Water: Number = 1.0;
  public Temperature: Number = 1.0;
  public Weight: Number = 1.0;
  public Melee: Number = 1.0;
  public Speed: Number = 1.0;
  public Temperature_Fortitude: Number = 1.0;
  public Crafting: Number = 1.0;

  public constructor(private _name: String) {
    this.name = _name;
  }


  public load(stats: any): Stats {
    if (stats && typeof stats === 'object') {
      for (const key in this) {
        if (stats.hasOwnProperty(key)) {
          this[key] = <any>(<any>stats[<any>key]);
        }
      }
    }
    return this.validate() ? this : new Stats(this.name);
  }


  public validate(): Boolean {
    return (
      this.validateName() &&
      this.validateValue(this.Health) &&
      this.validateValue(this.Stamina) &&
      this.validateValue(this.Torpidity) &&
      this.validateValue(this.Oxygen) &&
      this.validateValue(this.Food) &&
      this.validateValue(this.Water) &&
      this.validateValue(this.Temperature) &&
      this.validateValue(this.Weight) &&
      this.validateValue(this.Melee) &&
      this.validateValue(this.Speed) &&
      this.validateValue(this.Temperature_Fortitude) &&
      this.validateValue(this.Crafting)
    );
  }

  private validateName(): Boolean {
    return (
      this.name !== undefined &&
      this.name !== null &&
      this.name !== '' &&
      (
        this.name === 'Player' ||
        this.name === 'DinoTamed' ||
        this.name === 'DinoWild'
      )
    );
  }

  public validateValue(value: any): Boolean {
    return (value !== undefined && value !== null && value !== '' && value > 0);
  }

  public toDataConfig(): String {
    let dataConfig: String = '';
    if (this.validate()) {
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[0]=' + this.Health + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[1]=' + this.Stamina + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[2]=' + this.Torpidity + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[3]=' + this.Oxygen + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[4]=' + this.Food + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[5]=' + this.Water + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[6]=' + this.Temperature + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[7]=' + this.Weight + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[8]=' + this.Melee + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[9]=' + this.Speed + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[10]=' + this.Temperature_Fortitude + '\n';
      dataConfig += 'PerLevelStatsMultiplier_' + this.name + '[11]=' + this.Crafting + '\n';
    }
    return dataConfig;
  }
}
