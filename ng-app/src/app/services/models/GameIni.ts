export class GameIni {

  public GlobalSpoilingTimeMultiplier: Number = 0;
  public GlobalItemDecompositionTimeMultiplier: Number = 0;
  public GlobalCorpseDecompositionTimeMultiplier: Number = 0;
  public PvPZoneStructureDamageMultiplier: Number = 6.0;
  public bPvEDisableFriendlyFire: Boolean = false;
  public ResourceNoReplenishRadiusPlayers: Number = 1;
  public ResourceNoReplenishRadiusStructures: Number = 1;
  public bAutoPvETimer: Boolean = false;
  public bAutoPvEUseSystemTime: Boolean = true;
  public AutoPvEStartTimeSeconds: Number = 0;
  public AutoPvEStopTimeSeconds: Number = 0;
  public LayEggIntervalMultiplier: Number = 1.0;
  public DinoTurretDamageMultiplier: Number = 1.0;
  public bDisableLootCrates: Boolean = false;
  public DinoHarvestingDamageMultiplier: 3.0;
  public bDisableFriendlyFire: Boolean = true;
  public CustomRecipeEffectivenessMultiplier: Number = 1.0;
  public CustomRecipeSkillMultiplier: Number = 1.0;
  public MatingIntervalMultiplier: Number = 1.0;
  public EggHatchSpeedMultiplier: Number = 1.0;
  public BabyMatureSpeedMultiplier: Number = 1.0;
  public bPassiveDefensesDamageRiderlessDinos: Boolean = false;
  public KillXPMultiplier: Number = 1.0;
  public HarvestXPMultiplier: Number = 1.0;
  public CraftXPMultiplier: Number = 1.0;
  public GenericXPMultiplier: Number = 1.0;
  public SpecialXPMultiplier: Number = 1.0;
  public PGMapName: String = 'PGMap';
  public PGTerrainPropertiesString: String = '';
  public bDisableDinoRiding: Boolean = false;
  public bDisableDinoTaming: Boolean = false;
  public bUseCorpseLocator: Boolean = false;
  public bDisableStructurePlacementCollision: Boolean = false;
  public FastDecayInterval: Number = 43200;
  public bUseSingleplayerSettings: Boolean = false;
  public bAllowUnlimitedRespecs: Boolean = false;
  public SupplyCrateLootQualityMultiplier: Number = 1.0;
  public FishingLootQualityMultiplier: Number = 1.0;
  public BabyCuddleIntervalMultiplier: Number = 1.0;
  public BabyCuddleGracePeriodMultiplier: Number = 1.0;
  public BabyCuddleLoseImprintQualitySpeedMultiplier: Number = 1.0;
  public BabyImprintingStatScaleMultiplier: Number = 1.0;
  public PlayerHarvestingDamageMultiplier: Number = 1.0;
  public CropGrowthSpeedMultiplier: Number = 1.0;
  public BabyFoodConsumptionSpeedMultiplier: Number = 1.0;
  public bPvEAllowTribeWar: Boolean = true;
  public bPvEAllowTribeWarCancel: Boolean = false;
  public CropDecaySpeedMultiplier: Number = 1.0;
  public HairGrowthSpeedMultiplier: Number = 1.0;
  public FuelConsumptionIntervalMultiplier: Number = 1.313000;
  public KickIdlePlayersPeriod: Number = 3600;
  public MaxNumberOfPlayersInTribe: Number = 0;

  constructor() {
  }

  public load(gameIni: GameIni): GameIni {
    for (const key in this) {
      if (gameIni.hasOwnProperty(key)) {
        this[key] = <any>(<any>gameIni[<any>key]);
      }
    }
    return this.validate() ? this : new GameIni();
  }

  public toDataConfig(): String {
    let dataConfig = '';
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        dataConfig += key + '=' + this[key].toString() + '\n';
      }
    }
    return dataConfig;
  }

  public validate(): Boolean {
    let result: Boolean = true;
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        if (
          this[key] === undefined ||
          this[key] === null ||
          (
            typeof this[key] === 'number' &&
            (<Number>(this[<any>key]) < 0)
          )
        ) {
          result = false;
        }
      }
    }
    return result;
  }
}
