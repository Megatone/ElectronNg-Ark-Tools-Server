import { Component, OnInit } from '@angular/core';
import saveAs from 'file-saver';

@Component({
  selector: 'app-game-user-settings',
  templateUrl: './game-user-settings.component.html',
  styleUrls: ['./game-user-settings.component.scss']
})
export class GameUserSettingsComponent implements OnInit {

  public config: Object = {
    allowThirdPersonPlayer: 0,
    AllowCaveBuildingPvE: 0,
    alwaysNotifyPlayerJoined: 0,
    alwaysNotifyPlayerLeft: 0,
    bAllowFlyerCarryPvE: 0,
    bDisableStructureDecayPvE: 0,
    DayCycleSpeedScale: 1.00000,
    DayTimeSpeedScale: 1.00000,
    NightTimeSpeedScale: 1.00000,
    DinoCharacterFoodDrainMultiplier: 1.00000,
    DinoCharacterHealthRecoveryMultiplier: 1.00000,
    DinoCharacterStaminaDrainMultiplier: 1.00000,
    DinoCountMultiplier: 1.00000,
    DinoDamageMultiplier: 1.00000,
    DinoResistanceMultiplier: 1.00000,
    globalVoiceChat: 0,
    HarvestAmountMultiplier: 1.00000,
    HarvestHealthMultiplier: 1.00000,
    MaxStructuresInRange: 6700,
    noTributeDownloads: 0,
    PreventDownloadSurvivors: 0,
    PreventDownloadItems: 0,
    PreventDownloadDinos: 0,
    PlayerCharacterFoodDrainMultiplier: 1.00000,
    PlayerCharacterHealthRecoveryMultiplier: 1.00000,
    PlayerCharacterStaminaDrainMultiplier: 1.00000,
    PlayerCharacterWaterDrainMultiplier: 1.00000,
    PlayerDamageMultiplier: 1.00000,
    PlayerResistanceMultiplier: 1.00000,
    proximityChat: 0,
    ResourceNoReplenishRadiusPlayers: 1.00000,
    ResourceNoReplenishRadiusStructures: 1.00000,
    ResourcesRespawnPeriodMultiplier: 1.00000,
    ServerAdminPassword: '',
    ServerCrosshair: 0,
    serverForceNoHud: 0,
    serverHardcore: 0,
    ServerPassword: '',
    serverPVE: 0,
    ShowMapPlayerLocation: 0,
    StructureDamageMultiplier: 1.00000,
    StructureResistanceMultiplier: 1.00000,
    TamedDinoDamageMultiplier: 1.00000,
    TamedDinoResistanceMultiplier: 1.00000,
    TamingSpeedMultiplier: 1.00000,
    XPMultiplier: 1.00000,
    EnablePVPGamma: 0,
    EnablePVEGamma: 0,
    SpectatorPassword: '',
    DifficultyOffset: 0.50000,
    PvEStructureDecayPeriodMultiplier: 1.00000,
    PvEStructureDecayDestructionPeriod: 1.00000,
    Banlist: 'http://arkdedicated.com/banlist.txt',
    PvPStructureDecay: 0,
    DisableDinoDecayPvE: 0,
    PvEDinoDecayPeriodMultiplier: 1.00000,
    AdminLogging: 0,
    MaxTamedDinos: 8000,
    MaxNumbersofPlayersInTribe: 2,
    BattleNumOfTribestoStartGame: 2,
    TimeToCollapseROD: 100,
    BattleAutoStartGameInterval: 100,
    BattleSuddenDeathInterval: 300,
    KickIdlePlayersPeriod: 1800,
    PerPlatformMaxStructuresMultiplier: 1.00000,
    StructureDamageRepairCooldown: 180,
    bForceAllStructureLocking: 1,
    AutoDestroyOldStructuresMultiplier: 0.00000,
    bUseVSync: 0,
    MaxPlatformSaddleStructureLimit: 100,
    bPassiveDefensesDamageRiderlessDinos: 1,
    RCONPort: 27020,
    AutoSavePeriodMinutes: 20,
    RCONServerGameLogBuffer: 600,
    OverrideStructurePlatformPrevention: 0,
    PreventOfflinePvPInterval: 60.0,
    bPvPDinoDecay: 1,
    bPvPStructureDecay: 1,
    DisableImprintDinoBuff: 1,
    AllowAnyoneBabyImprintCuddle: 1,
    EnableExtraStructurePreventionVolumes: 1,
    ShowFloatingDamageText: 1,
    DestroyUnconnectedWaterPipes: 0,
    OverrideOfficialDifficulty: 1.0,
    TheMaxStructuresInRange: 10500,
    MinimumDinoReuploadInterval: 0,
    PvEAllowStructuresAtSupplyDrops: 0,
    NPCNetworkStasisRangeScalePlayerCountStart: 70,
    NPCNetworkStasisRangeScalePlayerCountEnd: 120,
    NPCNetworkStasisRangeScalePercentEnd: 0.50,
    MaxPersonalTamedDinos: 500,
    AutoDestroyDecayedDinos: 1,
    ClampItemSpoilingTimes: 0,
    UseOptimizedHarvestingHealth: 1,
    AllowCrateSpawnsOnTopOfStructures: 1,
    ForceFlyerExplosives: 0,
    PreventOfflinePvP: 1,
    AllowFlyingStaminaRecovery: 1,
    AllowMultipleAttachedC4: 1,
    OxygenSwimSpeedStatMultiplier: 1.00,
    bPvEDisableFriendlyFire: 1,
    ServerAutoForceRespawnWildDinosInterval: 86400,
    DisableWeatherFog: 0,
    RandomSupplyCratePoints: 0,
    CrossARKAllowForeignDinoDownloads: 0,
    PersonalTamedDinosSaddleStructureCost: 19,
    MaxPlayers: 70,
    SessionName: 'Session Name',
    Duration: 30,
    Message: 'Welcome'
  };

  constructor() { }

  public ngOnInit(): void {
  }

  public generate(): String {
    let result = '';
    // tslint:disable-next-line:forin
    for (const key in this.config) {
      if (key === 'MaxPlayers') {
        result += '\n[/script/engine.gamesession]\n';
      } else if (key === 'SessionName') {
        result += '\n[SessionSettings]\n';
      } else if (key === 'Duration') {
        result += '\n[MessageOfTheDay]\n';
      } else if (key === 'allowThirdPersonPlayer') {
        result += '\n[ServerSettings]\n';
      }

      result += key + '=' + this.config[key] + '\n';
    }
     const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'GameUserSettings.ini.txt');
    return result;
  }



}
