import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-ini',
  templateUrl: './game-ini.component.html',
  styleUrls: ['./game-ini.component.scss']
})
export class GameIniComponent implements OnInit {

  public config = {
    GlobalSpoilingTimeMultiplier: 0,
    GlobalItemDecompositionTimeMultiplier: 0,
    GlobalCorpseDecompositionTimeMultiplier: 0,
    PvPZoneStructureDamageMultiplier: 6.0,
    bPvEDisableFriendlyFire: false,
    ResourceNoReplenishRadiusPlayers: 1,
    ResourceNoReplenishRadiusStructures: 1,
    bAutoPvETimer: false,
    bAutoPvEUseSystemTime: true,
    AutoPvEStartTimeSeconds: 0,
    AutoPvEStopTimeSeconds: 0,
    LayEggIntervalMultiplier: 1.0,
    DinoTurretDamageMultiplier: 1.0,
    bDisableLootCrates: false,
    DinoHarvestingDamageMultiplier: 3.0,
    bDisableFriendlyFire: true,
    CustomRecipeEffectivenessMultiplier: 1.0,
    CustomRecipeSkillMultiplier: 1.0,
    MatingIntervalMultiplier: 1.0,
    EggHatchSpeedMultiplier: 1.0,
    BabyMatureSpeedMultiplier: 1.0,
    bPassiveDefensesDamageRiderlessDinos: false,
    KillXPMultiplier: 1.0,
    HarvestXPMultiplier: 1.0,
    CraftXPMultiplier: 1.0,
    GenericXPMultiplier: 1.0,
    SpecialXPMultiplier: 1.0,
    PGMapName: 'PGMap',
    PGTerrainPropertiesString: '',
    bDisableDinoRiding: false,
    bDisableDinoTaming: false,
    bUseCorpseLocator: false,
    bDisableStructurePlacementCollision: false,
    FastDecayInterval: 43200,
    bUseSingleplayerSettings: false,
    bAllowUnlimitedRespecs: false,
    SupplyCrateLootQualityMultiplier: 1.0,
    FishingLootQualityMultiplier: 1.0,
    BabyCuddleIntervalMultiplier: 1.0,
    BabyCuddleGracePeriodMultiplier: 1.0,
    BabyCuddleLoseImprintQualitySpeedMultiplier: 1.0,
    BabyImprintingStatScaleMultiplier: 1.0,
    PlayerHarvestingDamageMultiplier: 1.0,
    CropGrowthSpeedMultiplier: 1.0,
    BabyFoodConsumptionSpeedMultiplier: 1.0,
    bPvEAllowTribeWar: true,
    bPvEAllowTribeWarCancel: false,
    CropDecaySpeedMultiplier: 1.0,
    HairGrowthSpeedMultiplier: 1.0,
    FuelConsumptionIntervalMultiplier: 1.313000,
    KickIdlePlayersPeriod: 3600,
    MaxNumberOfPlayersInTribe: 0
  };

  constructor() {}

  ngOnInit() {}

}
