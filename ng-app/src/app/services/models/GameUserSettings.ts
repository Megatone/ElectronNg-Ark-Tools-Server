export class GameUserSettings {

  public allowThirdPersonPlayer: Number = 0;
  public AllowCaveBuildingPvE: Number = 0;
  public alwaysNotifyPlayerJoined: Number = 0;
  public alwaysNotifyPlayerLeft: Number = 0;
  public bAllowFlyerCarryPvE: Number = 0;
  public bDisableStructureDecayPvE: Number = 0;
  public DayCycleSpeedScale: Number = 1.00000;
  public DayTimeSpeedScale: Number = 1.00000;
  public NightTimeSpeedScale: Number = 1.00000;
  public DinoCharacterFoodDrainMultiplier: Number = 1.00000;
  public DinoCharacterHealthRecoveryMultiplier: Number = 1.00000;
  public DinoCharacterStaminaDrainMultiplier: Number = 1.00000;
  public DinoCountMultiplier: Number = 1.00000;
  public DinoDamageMultiplier: Number = 1.00000;
  public DinoResistanceMultiplier: Number = 1.00000;
  public globalVoiceChat: Number = 0;
  public HarvestAmountMultiplier: Number = 1.00000;
  public HarvestHealthMultiplier: Number = 1.00000;
  public MaxStructuresInRange: Number = 6700;
  public noTributeDownloads: Number = 0;
  public PreventDownloadSurvivors: Number = 0;
  public PreventDownloadItems: Number = 0;
  public PreventDownloadDinos: Number = 0;
  public PlayerCharacterFoodDrainMultiplier: Number = 1.00000;
  public PlayerCharacterHealthRecoveryMultiplier: Number = 1.00000;
  public PlayerCharacterStaminaDrainMultiplier: Number = 1.00000;
  public PlayerCharacterWaterDrainMultiplier: Number = 1.00000;
  public PlayerDamageMultiplier: Number = 1.00000;
  public PlayerResistanceMultiplier: Number = 1.00000;
  public proximityChat: Number = 0;
  public ResourceNoReplenishRadiusPlayers: Number = 1.00000;
  public ResourceNoReplenishRadiusStructures: Number = 1.00000;
  public ResourcesRespawnPeriodMultiplier: Number = 1.00000;
  public ServerAdminPassword: String = '';
  public ServerCrosshair: Number = 0;
  public serverForceNoHud: Number = 0;
  public serverHardcore: Number = 0;
  public ServerPassword: String = '';
  public serverPVE: Number = 0;
  public ShowMapPlayerLocation: Number = 0;
  public StructureDamageMultiplier: Number = 1.00000;
  public StructureResistanceMultiplier: Number = 1.00000;
  public TamedDinoDamageMultiplier: Number = 1.00000;
  public TamedDinoResistanceMultiplier: Number = 1.00000;
  public TamingSpeedMultiplier: Number = 1.00000;
  public XPMultiplier: Number = 1.00000;
  public EnablePVPGamma: Number = 0;
  public EnablePVEGamma: Number = 0;
  public SpectatorPassword: String = '';
  public DifficultyOffset: Number = 0.50000;
  public PvEStructureDecayPeriodMultiplier: Number = 1.00000;
  public PvEStructureDecayDestructionPeriod: Number = 1.00000;
  public Banlist: String = 'http://arkdedicated.com/banlist.txt';
  public PvPStructureDecay: Number = 0;
  public DisableDinoDecayPvE: Number = 0;
  public PvEDinoDecayPeriodMultiplier: Number = 1.00000;
  public AdminLogging: Number = 0;
  public MaxTamedDinos: Number = 8000;
  public MaxNumbersofPlayersInTribe: Number = 2;
  public BattleNumOfTribestoStartGame: Number = 2;
  public TimeToCollapseROD: Number = 100;
  public BattleAutoStartGameInterval: Number = 100;
  public BattleSuddenDeathInterval: Number = 300;
  public KickIdlePlayersPeriod: Number = 1800;
  public PerPlatformMaxStructuresMultiplier: Number = 1.00000;
  public StructureDamageRepairCooldown: Number = 180;
  public bForceAllStructureLocking: Number = 1;
  public AutoDestroyOldStructuresMultiplier: Number = 0.00000;
  public bUseVSync: Number = 0;
  public MaxPlatformSaddleStructureLimit: Number = 100;
  public bPassiveDefensesDamageRiderlessDinos: Number = 1;
  public RCONPort: Number = 27020;
  public AutoSavePeriodMinutes: Number = 20;
  public RCONServerGameLogBuffer: Number = 600;
  public OverrideStructurePlatformPrevention: Number = 0;
  public PreventOfflinePvPInterval: Number = 60.0;
  public bPvPDinoDecay: Number = 1;
  public bPvPStructureDecay: Number = 1;
  public DisableImprintDinoBuff: Number = 1;
  public AllowAnyoneBabyImprintCuddle: Number = 1;
  public EnableExtraStructurePreventionVolumes: Number = 1;
  public ShowFloatingDamageText: Number = 1;
  public DestroyUnconnectedWaterPipes: Number = 0;
  public OverrideOfficialDifficulty: Number = 1.0;
  public TheMaxStructuresInRange: Number = 10500;
  public MinimumDinoReuploadInterval: Number = 0;
  public PvEAllowStructuresAtSupplyDrops: Number = 0;
  public NPCNetworkStasisRangeScalePlayerCountStart: Number = 70;
  public NPCNetworkStasisRangeScalePlayerCountEnd: Number = 120;
  public NPCNetworkStasisRangeScalePercentEnd: Number = 0.50;
  public MaxPersonalTamedDinos: Number = 500;
  public AutoDestroyDecayedDinos: Number = 1;
  public ClampItemSpoilingTimes: Number = 0;
  public UseOptimizedHarvestingHealth: Number = 1;
  public AllowCrateSpawnsOnTopOfStructures: Number = 1;
  public ForceFlyerExplosives: Number = 0;
  public PreventOfflinePvP: Number = 1;
  public AllowFlyingStaminaRecovery: Number = 1;
  public AllowMultipleAttachedC4: Number = 1;
  public OxygenSwimSpeedStatMultiplier: Number = 1.00;
  public bPvEDisableFriendlyFire: Number = 1;
  public ServerAutoForceRespawnWildDinosInterval: Number = 86400;
  public DisableWeatherFog: Number = 0;
  public RandomSupplyCratePoints: Number = 0;
  public CrossARKAllowForeignDinoDownloads: Number = 0;
  public PersonalTamedDinosSaddleStructureCost: Number = 19;
  public MaxPlayers: Number = 70;
  public SessionName: String = 'Session Name';
  public Duration: Number = 30;
  public Message: String = 'Welcome';

  public load(gameUserSettings: any): GameUserSettings {
    for (const key in this) {
      if (gameUserSettings.hasOwnProperty(key)) {
        this[key] = <any>(<any>gameUserSettings[<any>key]);
      }
    }
    return this.validate() ? this : new GameUserSettings();
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

  public toDataConfig(): String {
    let dataConfig = '';
    // tslint:disable-next-line:forin
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        if (key === 'MaxPlayers') {
          dataConfig += '\n[/script/engine.gamesession]\n';
        } else if (key === 'SessionName') {
          dataConfig += '\n[SessionSettings]\n';
        } else if (key === 'Duration') {
          dataConfig += '\n[MessageOfTheDay]\n';
        } else if (key === 'allowThirdPersonPlayer') {
          dataConfig += '\n[ServerSettings]\n';
        }

        dataConfig += key + '=' + this[key] + '\n';
      }
    }
    return dataConfig;
  }
}
