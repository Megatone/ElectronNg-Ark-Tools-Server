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
    return this.getDefaultMods().concat(
      modIds.map((modId) => {
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
      })
    );

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
      this.http.get('./assets/maps.json').subscribe((maps: Array<Map>) => {
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

  public getDefaultMods(): Array<Mod> {
    const mods = [];

    const ark_mod = new Mod('ARK');
    ark_mod.name = 'ARK';
    ark_mod.dinos = [
      'Achatina_Character_BP_C',
      'Allo_Character_BP_C',
      'MegaCarno_Character_BP_C',
      'Alpha_Leedsichthys_Character_BP_C',
      'MegaMegalodon_Character_BP_C',
      'Mosa_Character_BP_Mega_C',
      'MegaRaptor_Character_BP_C',
      'MegaRex_Character_BP_C',
      'Mega_Tusoteuthis_Character_BP_C',
      'Ammonite_Character_C',
      'Angler_Character_BP_C',
      'Ankylo_Character_BP_C',
      'SpiderS_Character_BP_C',
      'Archa_Character_BP_C',
      'Argent_Character_BP_C',
      'Arthro_Character_BP_C',
      'Baryonyx_Character_BP_C',
      'Basilosaurus_Character_BP_C',
      'Toad_Character_BP_C',
      'Sauropod_Character_BP_C',
      'SpiderL_Character_BP_C',
      'Chalico_Character_BP_C',
      'Turtle_Character_BP_C',
      'Carno_Character_BP_C',
      'Beaver_Character_BP_C',
      'Cnidaria_Character_BP_C',
      'Coel_Character_BP_C',
      'Compy_Character_BP_C',
      'Daeodon_Character_BP_C',
      'Deathworm_Character_BP_C',
      'Dilo_Character_BP_C',
      'Dimetro_Character_BP_C',
      'Dimorph_Character_BP_C',
      'Diplocaulus_Character_BP_C',
      'Diplodocus_Character_BP_C',
      'Direbear_Character_BP_C',
      'Direwolf_Character_BP_C',
      'Dodo_Character_BP_C',
      'DodoRex_Character_BP_C',
      'Doed_Character_BP_C',
      'Dragon_Character_BP_C',
      'DungBeetle_Character_BP_C',
      'Dunkle_Character_BP_C',
      'Eel_Character_BP_C',
      'Equus_Character_BP_C',
      'Equus_Character_BP_Unicorn_C',
      'Euryp_Character_C',
      'Galli_Character_BP_C',
      'Bee_Character_BP_C',
      'Gigant_Character_BP_C',
      'Bigfoot_Character_BP_C',
      'Griffin_Character_BP_C',
      'Hesperornis_Character_BP_C',
      'Hyaenodon_Character_BP_C',
      'Ichthyornis_Character_BP_C',
      'Dolphin_Character_BP_C',
      'Iguanodon_Character_BP_C',
      'Kairuku_Character_BP_C',
      'Kaprosuchus_Character_BP_C',
      'Kentro_Character_BP_C',
      'Leech_Character_C',
      'Leech_Character_Diseased_C',
      'Leedsichthys_Character_BP_C',
      'Liopleurodon_Character_BP_C',
      'Lystro_Character_BP_C',
      'Mammoth_Character_BP_C',
      'Manta_Character_BP_C',
      'Manticore_Character_BP_C',
      'Megalania_Character_BP_C',
      'Stag_Character_BP_C',
      'Megalodon_Character_BP_C',
      'Megalosaurus_Character_BP_C',
      'Dragonfly_Character_BP_C',
      'Gorilla_Character_BP_C',
      'Megatherium_Character_BP_C',
      'Monkey_Character_BP_C',
      'Microraptor_Character_BP_C',
      'Mosa_Character_BP_C',
      'Moschops_Character_BP_C',
      'Bat_Character_BP_C',
      'Otter_Character_BP_C',
      'Oviraptor_Character_BP_C',
      'Sheep_Character_BP_C',
      'Pachy_Character_BP_C',
      'Pachyrhino_Character_BP_C',
      'Paracer_Character_BP_C',
      'Para_Character_BP_C',
      'Pegomastax_Character_BP_C',
      'Pela_Character_BP_C',
      'Phiomia_Character_BP_C',
      'Phoenix_Character_BP_C',
      'Piranha_Character_BP_C',
      'Plesiosaur_Character_BP_C',
      'Procoptodon_Character_BP_C',
      'Ptero_Character_BP_C',
      'Scorpion_Character_BP_C',
      'Purlovia_Character_BP_C',
      'Quetz_Character_BP_C',
      'Raptor_Character_BP_C',
      'Rex_Character_BP_C',
      'Saber_Character_BP_C',
      'Salmon_Character_BP_C',
      'Sarco_Character_BP_C',
      'Bone_Sauropod_Character_BP_C',
      'Bone_MegaCarno_Character_BP_C',
      'Bone_Gigant_Character_BP_C',
      'Bone_Quetz_Character_BP_C',
      'Bone_MegaRaptor_Character_BP_C',
      'Bone_MegaRex_Character_BP_C',
      'Bone_Stego_Character_BP_C',
      'Bone_Trike_Character_BP_C',
      'Spino_Character_BP_C',
      'Stego_Character_BP_C',
      'Tapejara_Character_BP_C',
      'BionicPara_Character_BP_C',
      'BionicQuetz_Character_BP_C',
      'BionicRaptor_Character_BP_C',
      'BionicRex_Character_BP_C',
      'BionicStego_Character_BP_C',
      'TerrorBird_Character_BP_C',
      'Therizino_Character_BP_C',
      'Thylacoleo_Character_BP_C',
      'BoaFrill_Character_BP_C',
      'Ant_Character_BP_C',
      'FlyingAnt_Character_BP_C',
      'Titanosaur_Character_BP_C',
      'Trike_Character_BP_C',
      'Trilobite_Character_C',
      'Troodon_Character_BP_C',
      'TurkeyBase_Character_BP_C',
      'Turkey_Character_BP_C',
      'Tusoteuthis_Character_BP_C',
      'Rhino_Character_BP_C',
      'Yeti_Character_BP_C',
      'Yutyrannus_Character_BP_C',
      'ZombieDodo_Character_BP_C'
    ].map((dino) => {
      return new Dino(dino);
    });
    mods.push(ark_mod);

    const scorched_mod = new Mod('ScorchedEarth');
    scorched_mod.name = 'ScorchedEarth';
    scorched_mod.dinos = [
      'MegaWyvern_Character_BP_Fire_C',
      'MegaDeathworm_Character_BP_C',
      'DodoWyvern_Character_BP_C',
      'Jerboa_Character_BP_C',
      'Bone_Jerboa_Character_BP_C',
      'Jugbug_Character_BaseBP_C',
      'Jugbug_Oil_Character_BP_C',
      'Jugbug_Water_Character_BP_C',
      'Moth_Character_BP_C',
      'Mantis_Character_BP_C',
      'camelsaurus_Character_BP_C',
      'RockGolem_Character_BP_C',
      'RubbleGolem_Character_BP_C',
      'SpineyLizard_Character_BP_C',
      'Vulture_Character_BP_C',
      'Wyvern_Character_BP_Base_C',
      'Wyvern_Character_BP_Fire_C',
      'Wyvern_Character_BP_Lightning_C',
      'Wyvern_Character_BP_Poison_C',
      'Ragnarok_Wyvern_Override_Ice_C',
      'Bone_MegaWyvern_Character_BP_Fire_C',
      'DodoWyvern_Character_BP_C',
      'Wyvern_Character_BP_ZombieFire_C',
      'Wyvern_Character_BP_ZombieLightning_C',
      'Wyvern_Character_BP_ZombiePoison_C'].map((d) => {
        return new Dino(d);
      });
    mods.push(scorched_mod);

    const aberration_mod = new Mod('Aberration');
    aberration_mod.name = 'Aberration';
    aberration_mod.dinos = [
      'Achatina_Character_BP_Aberrant_C',
      'Angler_Character_BP_Aberrant_C',
      'Ankylo_Character_BP_Aberrant_C',
      'SpiderS_Character_BP_Aberrant_C',
      'Arthro_Character_BP_Aberrant_C',
      'Baryonyx_Character_BP_Aberrant_C',
      'Toad_Character_BP_Aberrant_C',
      'Turtle_Character_BP_Aberrant_C',
      'Carno_Character_BP_Aberrant_C',
      'Cnidaria_Character_BP_Aberrant_C',
      'Coel_Character_BP_Aberrant_C',
      'Dimetro_Character_BP_Aberrant_C',
      'Dimorph_Character_BP_Aberrant_C',
      'Diplocaulus_Character_BP_Aberrant_C',
      'Diplodocus_Character_BP_Aberrant_C',
      'Direbear_Character_BP_Aberrant_C',
      'Dodo_Character_BP_Aberrant_C',
      'Doed_Character_BP_Aberrant_C',
      'DungBeetle_Character_BP_Aberrant_C',
      'Eel_Character_BP_Aberrant_C',
      'Equus_Character_BP_Aberrant_C',
      'Bigfoot_Character_BP_Aberrant_C',
      'Iguanodon_Character_BP_Aberrant_C',
      'Lystro_Character_BP_Aberrant_C',
      'Manta_Character_BP_Aberrant_C',
      'Megalania_Character_BP_Aberrant_C',
      'Megalosaurus_Character_BP_Aberrant_C',
      'Dragonfly_Character_BP_Aberrant_C',
      'Moschops_Character_BP_Aberrant_C',
      'Otter_Character_BP_Aberrant_C',
      'Sheep_Character_BP_Aberrant_C',
      'Paracer_Character_BP_Aberrant_C',
      'Para_Character_BP_Aberrant_C',
      'Piranha_Character_BP_Aberrant_C',
      'Scorpion_Character_BP_Aberrant_C',
      'Purlovia_Character_BP_Aberrant_C',
      'Raptor_Character_BP_Aberrant_C',
      'Salmon_Character_Aberrant_C',
      'Sarco_Character_BP_Aberrant_C',
      'Spino_Character_BP_Aberrant_C',
      'Stego_Character_BP_Aberrant_C',
      'BoaFrill_Character_BP_Aberrant_C',
      'Trike_Character_BP_Aberrant_C',
      'Trilobite_Character_Aberrant_C',
      'MegaBasilisk_Character_BP_C',
      'MegaCrab_Character_BP_C',
      'MegaXenomorph_Character_BP_Male_Surface_C',
      'Basilisk_Character_BP_C',
      'LanternPug_Character_BP_C',
      'LanternBird_Character_BP_C',
      'Lightbug_Character_BaseBP_C',
      'LanternLizard_Character_BP_C',
      'Crab_Character_BP_C',
      'Lamprey_Character_C',
      'ChupaCabra_Character_BP_C',
      'Xenomorph_Character_BP_C',
      'CaveWolf_Character_BP_C',
      'Xenomorph_Character_BP_Male_C',
      'Xenomorph_Character_BP_Male_Tamed_C',
      'Xenomorph_Character_BP_Female_C',
      'RockDrake_Character_BP_C',
      'Rockwell_Character_BP_C',
      'Rockwell_Character_BP_Hard_C',
      'Rockwell_Character_BP_Medium_C',
      'Rockwell_Character_BP_Easy_C',
      'RockwellTentacle_Character_BP_C',
      'RockwellTentacle_Character_BP_Alpha_C',
      'RockwellTentacle_Character_BP_Beta_C',
      'RockwellTentacle_Character_BP_Gamma_C',
      'MoleRat_Character_BP_C',
      'Pteroteuthis_Char_BP_C',
      'LanternGoat_Character_BP_C'
    ].map((d) => {
      return new Dino(d);
    });

    mods.push(aberration_mod);
    const extinction_mod = new Mod('Extinction');
    extinction_mod.name = 'Extinction';
    extinction_mod.dinos = [
      'KingKaiju_Character_BP_Alpha_C',
      'KingKaiju_Character_BP_Beta_C',
      'CorruptTumor_Character_BP_C',
      'Arthro_Character_BP_Corrupt_C',
      'Carno_Character_BP_Corrupt_C',
      'Chalico_Character_BP_Corrupt_C',
      'Deathworm_Character_BP_Corrupt_C',
      'Dilo_Character_BP_Corrupt_C',
      'Dimorph_Character_BP_Corrupt_C',
      'Gigant_Character_BP_Corrupt_C',
      'Paracer_Character_BP_Corrupt_C',
      'Ptero_Character_BP_Corrupt_C',
      'Raptor_Character_BP_Corrupt_C',
      'Xenomorph_Character_BP_Male_Tamed_Corrupt_C',
      'Rex_Character_BP_Corrupt_C',
      'RockDrake_Character_BP_Corrupt_C',
      'Spino_Character_BP_Corrupt_C',
      'Stego_Character_BP_Corrupt_C',
      'Trike_Character_BP_Corrupt_C',
      'Wyvern_Character_BP_Fire_Corrupt_C',
      'Defender_Character_BP_C',
      'DesertKaiju_Character_BP_C',
      'DesertKaiju_FirstFlockChar_BP_C',
      'Enforcer_Character_BP_C',
      'MegaRex_Character_BP_Corrupt_C',
      'MegaTrike_Character_BP_Corrupt_C',
      'ForestKaiju_Character_BP_C',
      'Wyvern_Character_BP_Fire_Minion_C',
      'Gacha_Character_BP_C',
      'KingKaiju_Character_BP_C',
      'GasBags_Character_BP_C',
      'IceKaiju_Character_BP_C',
      'IceJumper_Character_BP_C',
      'MegaMek_Character_BP_C',
      'Mek_Character_BP_C',
      'Scout_Character_BP_C',
      'Owl_Character_BP_C',
      'Spindles_Character_BP_C'
    ].map((d) => {
      return new Dino(d);
    });

    mods.push(extinction_mod);

    return mods;
  }

  public getHarvest(): Harvest {
    const harvest = new Harvest();

    harvest.resources = [
      { img: 'a/a8/Absorbent_Substrate.png/53px-Absorbent_Substrate.png?version=489692964aee5c70c2ce4259fdc1168a', name: 'Absorbent Substrate', tag: 'PrimalItemResource_SubstrateAbsorbent_C', type: 'resource' }
      , { img: '0/03/Cementing_Paste.png/53px-Cementing_Paste.png?version=20cd7ffcc6bbb428622b73c4bf457f8c', name: 'Achatina Paste', tag: 'PrimalItemResource_SnailPaste_C', type: 'resource' }
      , { img: 'f/fd/Ammonite_Bile.png/53px-Ammonite_Bile.png?version=b9e1513df9b86e74649ebf1a61e9306b', name: 'Ammonite Bile', tag: 'PrimalItemResource_AmmoniteBlood_C', type: 'resource' }
      , { img: '0/01/Angler_Gel.png/53px-Angler_Gel.png?version=a84a0040fb9faa30fceeb24f14531030', name: 'Angler Gel', tag: 'PrimalItemResource_AnglerGel_C', type: 'resource' }
      , { img: '4/4c/Black_Pearl.png/53px-Black_Pearl.png?version=dec2b87e8059acf908612664eb580a79', name: 'Black Pearl', tag: 'PrimalItemResource_BlackPearl_C', type: 'resource' }
      , { img: '8/89/Blue_Crystalized_Sap_%28Extinction%29.png/53px-Blue_Crystalized_Sap_%28Extinction%29.png?version=4ff08e7601efd82f7a97167d26b28f50', name: 'Blue Crystalized Sap', tag: 'PrimalItemResource_BlueSap_C', type: 'resource' }
      , { img: '1/13/Blue_Gem_%28Aberration%29.png/53px-Blue_Gem_%28Aberration%29.png?version=18a30feab217f4ae9b8933b780c85389', name: 'Blue Gem', tag: 'PrimalItemResource_Gem_BioLum_C', type: 'resource' }
      , { img: '5/58/Blood_Pack.png/53px-Blood_Pack.png?version=985ec3e65aeb1aa7ff625f89bbf56801', name: 'Blood Pack', tag: 'PrimalItemConsumable_BloodPack_C', type: 'resource' }
      , { img: '0/03/Cementing_Paste.png/53px-Cementing_Paste.png?version=20cd7ffcc6bbb428622b73c4bf457f8c', name: 'Cementing Paste', tag: 'PrimalItemResource_ChitinPaste_C', type: 'resource' }
      , { img: '4/4f/Charcoal.png/53px-Charcoal.png?version=abd5c833bde10d3f3583d8f1129a79dc', name: 'Charcoal', tag: 'PrimalItemResource_Charcoal_C', type: 'resource' }
      , { img: '0/00/Charge_Battery_%28Aberration%29.png/53px-Charge_Battery_%28Aberration%29.png?version=0629250627bc9ef56df578398af09422', name: 'Charge Battery', tag: 'PrimalItem_ChargeBattery_C', type: 'resource' }
      , { img: 'f/f2/Chitin_or_Keratin.png/53px-Chitin_or_Keratin.png?version=2e4a528a2a6531552a3271e0b76a8715', name: 'Chitin or Keratin', tag: 'PrimalItemResource_ChitinOrKeratin_C', type: 'resource' }
      , { img: 'a/a1/Chitin.png/53px-Chitin.png?version=e2fa242e8f38e5cbd6dd369c8f8dd122', name: 'Chitin', tag: 'PrimalItemResource_Chitin_C', type: 'resource' }
      , { img: '3/37/Clay_%28Scorched_Earth%29.png/53px-Clay_%28Scorched_Earth%29.png?version=2f1ca9654e56b6ec827db2d4c1abf9a4', name: 'Clay', tag: 'PrimalItemResource_Clay_C', type: 'resource' }
      , { img: '7/70/Condensed_Gas_%28Extinction%29.png/53px-Condensed_Gas_%28Extinction%29.png?version=59966c1da11a812f5547a26c4a8eb049', name: 'Condensed Gas', tag: 'PrimalItemResource_CondensedGas_C', type: 'resource' }
      , { img: '7/7e/Congealed_Gas_Ball_%28Aberration%29.png/53px-Congealed_Gas_Ball_%28Aberration%29.png?version=67abb2d0a58bcc0b4fddee47faab3df7', name: 'Congealed Gas Ball', tag: 'PrimalItemResource_Gas_C', type: 'resource' }
      , { img: '6/67/Corrupted_Nodule_%28Extinction%29.png/53px-Corrupted_Nodule_%28Extinction%29.png?version=8ee07e9109bd0a17044dd9af7373a0bf', name: 'Corrupted Nodule', tag: 'PrimalItemResource_CorruptedPolymer_C', type: 'resource' }
      , { img: '0/0b/Element_Dust_%28Extinction%29.png/53px-Element_Dust_%28Extinction%29.png?version=6bfde60e81b4b098408029c895afcdfe', name: 'Crafted Element Dust', tag: 'PrimalItemResource_ElementDustFromShards_C', type: 'resource' }
      , { img: '3/31/Crystal.png/53px-Crystal.png?version=a03486ec5350e1bc6633a4c9359ba1e0', name: 'Crystal', tag: 'PrimalItemResource_Crystal_C', type: 'resource' }
      , { img: '3/34/Deathworm_Horn_%28Scorched_Earth%29.png/53px-Deathworm_Horn_%28Scorched_Earth%29.png?version=23fd25a04dce1c6610041118a5cd692a', name: 'Deathworm Horn', tag: 'PrimalItemResource_KeratinSpike_C', type: 'resource' }
      , { img: '3/32/Deathworm_Horn_or_Woolly_Rhino_Horn.png/53px-Deathworm_Horn_or_Woolly_Rhino_Horn.png?version=5755527e761534a33464f7b53a71f716', name: 'Deathworm Horn or Woolly Rhino Horn', tag: '-', type: 'resource' }
      , { img: '3/35/Dermis_%28Extinction%29.png/53px-Dermis_%28Extinction%29.png?version=4c99d14bc2a503f8ef4c19e57c71a396', name: 'Dermis', tag: 'PrimalItem_TaxidermyDermis_C', type: 'resource' }
      , { img: '5/50/Dinosaur_Bone.png/53px-Dinosaur_Bone.png?version=beaac62a8731f53adeda73d2f004ef8b', name: 'Dinosaur Bone', tag: 'PrimalItemResource_ARKBone_C', type: 'resource' }
      , { img: 'd/dd/Electronics.png/53px-Electronics.png?version=808148ad5a8823f9fd13b95f82193111', name: 'Electronics', tag: 'PrimalItemResource_Electronics_C', type: 'resource' }
      , { img: 'a/a5/Element.png/53px-Element.png?version=607aff81501852fe4034031a21a67529', name: 'Element', tag: 'PrimalItemResource_Element_C', type: 'resource' }
      , { img: '0/0b/Element_Dust_%28Extinction%29.png/53px-Element_Dust_%28Extinction%29.png?version=6bfde60e81b4b098408029c895afcdfe', name: 'Element Dust', tag: 'PrimalItemResource_ElementDust_C', type: 'resource' }
      , { img: '6/65/Element_Ore_%28Aberration%29.png/53px-Element_Ore_%28Aberration%29.png?version=9fc43e7c1bdd1dc22f008dfeb9396287', name: 'Element Ore', tag: 'PrimalItemResource_ElementOre_C', type: 'resource' }
      , { img: 'b/be/Element_Shard.png/53px-Element_Shard.png?version=82d00b41501ca5607f1b2729485c3be2', name: 'Element Shard', tag: 'PrimalItemResource_ElementShard_C', type: 'resource' }
      , { img: '2/25/Fertilizer.png/53px-Fertilizer.png?version=f1571476243e08837b24223a1ec53f46', name: 'Fertilizer', tag: 'PrimalItemConsumable_Fertilizer_Compost_C', type: 'resource' }
      , { img: '4/45/Fiber.png/53px-Fiber.png?version=f45dbdc4b0d7c162bdf9c481452f7667', name: 'Fiber', tag: 'PrimalItemResource_Fibers_C', type: 'resource' }
      , { img: '2/2e/Flint.png/53px-Flint.png?version=d277fdd56f44dc864c2a8ebff9d3e6c7', name: 'Flint', tag: 'PrimalItemResource_Flint_C', type: 'resource' }
      , { img: 'c/c3/Green_Gem_%28Aberration%29.png/53px-Green_Gem_%28Aberration%29.png?version=d26dc6f53757355e5cabf5e52e711ea3', name: 'Fragmented Green Gem', tag: 'PrimalItemResource_FracturedGem_C', type: 'resource' }
      , { img: 'd/de/Fungal_Wood.png/53px-Fungal_Wood.png?version=c239a9d49d59d72a1ccc0cd668329ca3', name: 'Fungal Wood', tag: 'PrimalItemResource_FungalWood_C', type: 'resource' }
      , { img: 'd/de/Fungal_Wood.png/53px-Fungal_Wood.png?version=c239a9d49d59d72a1ccc0cd668329ca3', name: 'Corrupted Wood', tag: 'PrimalItemResource_CorruptedWood_C', type: 'resource' }
      , { img: '6/6e/Gasoline.png/53px-Gasoline.png?version=a8999040a701b49223592d5224c8ed0f', name: 'Gasoline', tag: 'PrimalItemResource_Gasoline_C', type: 'resource' }
      , { img: 'c/c3/Green_Gem_%28Aberration%29.png/53px-Green_Gem_%28Aberration%29.png?version=d26dc6f53757355e5cabf5e52e711ea3', name: 'Green Gem', tag: 'PrimalItemResource_Gem_Fertile_C', type: 'resource' }
      , { img: 'a/ae/Gunpowder.png/53px-Gunpowder.png?version=ee958558f20cced6e2f00b46f8151c2c', name: 'Gunpowder', tag: 'PrimalItemResource_Gunpowder_C', type: 'resource' }
      , { img: '9/96/Hide.png/53px-Hide.png?version=6cc55187724d13765eb48b53e6a6df63', name: 'Hide', tag: 'PrimalItemResource_Hide_C', type: 'resource' }
      , { img: '1/16/Human_Hair.png/53px-Human_Hair.png?version=141f4740a1b45f33468d537060086580', name: 'Human Hair', tag: 'PrimalItemResource_Hair_C', type: 'resource' }
      , { img: '8/88/Keratin.png/53px-Keratin.png?version=7712681203f55c2fbfa22605d123a7a2', name: 'Keratin', tag: 'PrimalItemResource_Keratin_C', type: 'resource' }
      , { img: 'e/e3/Leech_Blood.png/53px-Leech_Blood.png?version=5abf7fae90492eee8315128d6a31cc46', name: 'Leech Blood', tag: 'PrimalItemResource_LeechBlood_C', type: 'resource' }
      , { img: '7/73/Leech_Blood_or_Horns.png/53px-Leech_Blood_or_Horns.png?version=d2714f4b4ac648ccfe19cc3daf6b3ad3', name: 'Leech Blood or Horns', tag: 'PrimalItemResourceGeneric_Curing_C', type: 'resource' }
      , { img: '3/37/Metal_Ingot.png/53px-Metal_Ingot.png?version=b10bd6ae744c3d8bde17843bdcedfd1b', name: 'Metal Ingot', tag: 'PrimalItemResource_MetalIngot_C', type: 'resource' }
      , { img: 'e/e1/Metal.png/53px-Metal.png?version=7587695ddde3156390507eb652b76d37', name: 'Metal', tag: 'PrimalItemResource_Metal_C', type: 'resource' }
      , { img: 'e/e6/Narcotic.png/53px-Narcotic.png?version=659e4f2f7adf712fc255608e7899746f', name: 'Narcotic', tag: 'PrimalItemConsumable_Narcotic_C', type: 'resource' }
      , { img: '2/23/Obsidian.png/53px-Obsidian.png?version=59d979e1da979bbfd8b07ea990d84f69', name: 'Obsidian', tag: 'PrimalItemResource_Obsidian_C', type: 'resource' }
      , { img: '0/06/Oil.png/53px-Oil.png?version=540bd67aa94e1a5615551b01364013d3', name: 'Oil', tag: 'PrimalItemResource_Oil_C', type: 'resource' }
      , { img: '0/06/Oil.png/53px-Oil.png?version=540bd67aa94e1a5615551b01364013d3', name: 'Oil (Tusoteuthis)', tag: 'PrimalItemResource_SquidOil_C', type: 'resource' }
      , { img: '1/13/Organic_Polymer.png/53px-Organic_Polymer.png?version=f41c773776930813c76541ee744d3142', name: 'Organic Polymer', tag: 'PrimalItemResource_Polymer_Organic_C', type: 'resource' }
      , { img: '4/45/Pelt.png/53px-Pelt.png?version=8543cc9c57af63495bc1246fbffbda3e', name: 'Pelt', tag: 'PrimalItemResource_Pelt_C', type: 'resource' }
      , { img: 'f/fd/Pelt%2C_Hair%2C_or_Wool.png/53px-Pelt%2C_Hair%2C_or_Wool.png?version=04a8a76c02bb521ba520e208685dc4d9', name: 'Pelt, Hair, or Wool', tag: 'PrimalItemResource_PeltOrHair_C', type: 'resource' }
      , { img: '8/81/Polymer.png/53px-Polymer.png?version=c0607b7b83aa6744e85c775c91a1920e', name: 'Polymer', tag: 'PrimalItemResource_Polymer_C', type: 'resource' }
      , { img: 'b/ba/Preserving_Salt_%28Scorched_Earth%29.png/53px-Preserving_Salt_%28Scorched_Earth%29.png?version=fd0ba0fd2a9b4a7e395514b03072a85b', name: 'Preserving Salt', tag: 'PrimalItemResource_PreservingSalt_C', type: 'resource' }
      , { img: '2/2f/Propellant_%28Scorched_Earth%29.png/53px-Propellant_%28Scorched_Earth%29.png?version=5df927a208da778c086af363443e8549', name: 'Propellant', tag: 'PrimalItemResource_Propellant_C', type: 'resource' }
      , { img: 'b/bb/Rare_Flower.png/53px-Rare_Flower.png?version=eb5474cbbc55fcb8bd629680dc14221f', name: 'Rare Flower', tag: 'PrimalItemResource_RareFlower_C', type: 'resource' }
      , { img: '3/30/Rare_Mushroom.png/53px-Rare_Mushroom.png?version=e426e7a7e7800d141f716473ba6d0711', name: 'Rare Mushroom', tag: 'PrimalItemResource_RareMushroom_C', type: 'resource' }
      , { img: '4/47/Raw_Salt_%28Scorched_Earth%29.png/53px-Raw_Salt_%28Scorched_Earth%29.png?version=e6899b6ef2dbcc27e4597ef68a44cad1', name: 'Raw Salt', tag: 'PrimalItemResource_RawSalt_C', type: 'resource' }
      , { img: '1/17/Re-Fertilizer.png/53px-Re-Fertilizer.png?version=65fc89fe49591c8657e52c8ddc9779c0', name: 'Re-Fertilizer', tag: 'PrimalItemConsumableMiracleGro_C', type: 'resource' }
      , { img: 'b/b6/Red_Crystalized_Sap_%28Extinction%29.png/53px-Red_Crystalized_Sap_%28Extinction%29.png?version=c6f62192c6cc0ba1761f151780e424fa', name: 'Red Crystalized Sap', tag: 'PrimalItemResource_RedSap_C', type: 'resource' }
      , { img: 'a/a6/Red_Gem_%28Aberration%29.png/53px-Red_Gem_%28Aberration%29.png?version=4c9ac324a8d69b817684bf2dbdd24ebc', name: 'Red Gem', tag: 'PrimalItemResource_Gem_Element_C', type: 'resource' }
      , { img: '0/0c/Sand_%28Scorched_Earth%29.png/53px-Sand_%28Scorched_Earth%29.png?version=ee0a5693e0fece826483ae87dd279c16', name: 'Sand', tag: 'PrimalItemResource_Sand_C', type: 'resource' }
      , { img: '7/73/Sap.png/53px-Sap.png?version=353a0efa02d878739109e7e646c57fc1', name: 'Sap', tag: 'PrimalItemResource_Sap_C', type: 'resource' }
      , { img: 'd/da/Scrap_Metal_%28Extinction%29.png/53px-Scrap_Metal_%28Extinction%29.png?version=5e3e4a5ef3f55d63231700b7f7ec4dd4', name: 'Scrap Metal', tag: 'PrimalItemResource_ScrapMetal_C', type: 'resource' }
      , { img: '3/35/Scrap_Metal_Ingot_%28Extinction%29.png/53px-Scrap_Metal_Ingot_%28Extinction%29.png?version=3e20f5f138a10e65b542035083178cf8', name: 'Scrap Metal Ingot', tag: 'PrimalItemResource_ScrapMetalIngot_C', type: 'resource' }
      , { img: '4/4a/Silica_Pearls.png/53px-Silica_Pearls.png?version=051270a2efd44625438606c34701307e', name: 'Silica Pearls', tag: 'PrimalItemResource_Silicon_C', type: 'resource' }
      , { img: '9/90/Silicate_%28Extinction%29.png/53px-Silicate_%28Extinction%29.png?version=1336af4b154d82731817b985792f2515', name: 'Silicate', tag: 'PrimalItemResource_Silicate_C', type: 'resource' }
      , { img: '7/7c/Silk_%28Scorched_Earth%29.png/53px-Silk_%28Scorched_Earth%29.png?version=a1e62fe0f0c7965c1b444ca024a960fd', name: 'Silk', tag: 'PrimalItemResource_Silk_C', type: 'resource' }
      , { img: '5/56/Sparkpowder.png/53px-Sparkpowder.png?version=6bf0d7078d1214c7e3924ed5da76386d', name: 'Sparkpowder', tag: 'PrimalItemResource_Sparkpowder_C', type: 'resource' }
      , { img: 'e/e2/Stimulant.png/53px-Stimulant.png?version=b64f43b55d4d8b920032f202be4506f7', name: 'Stimulant', tag: 'PrimalItemConsumable_Stimulant_C', type: 'resource' }
      , { img: 'd/d4/Stone.png/53px-Stone.png?version=277617650a5677caa753bda60ac153a0', name: 'Stone', tag: 'PrimalItemResource_Stone_C', type: 'resource' }
      , { img: 'c/cf/Sulfur_%28Scorched_Earth%29.png/53px-Sulfur_%28Scorched_Earth%29.png?version=a75f4657875bd3e6a43155d170ca2f5b', name: 'Sulfur', tag: 'PrimalItemResource_Sulfur_C', type: 'resource' }
      , { img: '5/51/Thatch.png/53px-Thatch.png?version=0f04fc4738e05f3e00f1e86eff7fbe6a', name: 'Thatch', tag: 'PrimalItemResource_Thatch_C', type: 'resource' }
      , { img: 'a/a5/Element.png/53px-Element.png?version=607aff81501852fe4034031a21a67529', name: 'Unstable Element', tag: 'PrimalItemResource_ElementRefined_C', type: 'resource' }
      , { img: 'b/be/Element_Shard.png/53px-Element_Shard.png?version=82d00b41501ca5607f1b2729485c3be2', name: 'Unstable Element Shard', tag: 'PrimalItemResource_ShardRefined_C', type: 'resource' }
      , { img: 'd/df/Wood.png/53px-Wood.png?version=0279c93f4828667696ea360d3a96c00d', name: 'Wood', tag: 'PrimalItemResource_Wood_C', type: 'resource' }
      , { img: '3/34/Wool.png/53px-Wool.png?version=5dc7fc5811123e10b38f53164ab252bd', name: 'Wool', tag: 'PrimalItemResource_Wool_C', type: 'resource' }
      , { img: '3/38/Woolly_Rhino_Horn.png/53px-Woolly_Rhino_Horn.png?version=12e16ad1677124a6e77fe9b702768618', name: 'Woolly Rhino Horn', tag: 'PrimalItemResource_Horn_C', type: 'resource' }
    ].map((_item) => {
      return new Item(_item.img, _item.name, _item.tag, _item.type);
    });

    harvest.consumables = [
      { img: 'e/e9/Raw_Meat.png/53px-Raw_Meat.png?version=67cfdc617f528c0746384ca25c521454', name: 'Raw Meat', tag: 'PrimalItemConsumable_RawMeat_C', type: 'consumable' }
      , { img: 'f/ff/Spoiled_Meat.png/53px-Spoiled_Meat.png?version=e29a77ea019867078ead71a882ab54bb', name: 'Spoiled Meat', tag: 'PrimalItemConsumable_SpoiledMeat_C', type: 'consumable' }
      , { img: 'c/cd/Cooked_Meat.png/53px-Cooked_Meat.png?version=7c4a26389bdd256497425c5c2c2a5aca', name: 'Cooked Meat', tag: 'PrimalItemConsumable_CookedMeat_C', type: 'consumable' }
      , { img: '0/09/Raw_Prime_Meat.png/53px-Raw_Prime_Meat.png?version=7d6d03331481e71db784aaafb1b81fb8', name: 'Raw Prime Meat', tag: 'PrimalItemConsumable_RawPrimeMeat_C', type: 'consumable' }
      , { img: '6/67/Cooked_Prime_Meat.png/53px-Cooked_Prime_Meat.png?version=5dbdc6487c1617b4a27ae795591e052b', name: 'Cooked Prime Meat', tag: 'PrimalItemConsumable_CookedPrimeMeat_C', type: 'consumable' }
      , { img: '8/86/Cooked_Meat_Jerky.png/53px-Cooked_Meat_Jerky.png?version=675d39c63df9add5bf82260b6b739fa8', name: 'Cooked Meat Jerky', tag: 'PrimalItemConsumable_CookedMeat_Jerky_C', type: 'consumable' }
      , { img: '5/51/Prime_Meat_Jerky.png/53px-Prime_Meat_Jerky.png?version=2940656d3ef2a7951a3bfe7bdb11393a', name: 'Prime Meat Jerky', tag: 'PrimalItemConsumable_CookedPrimeMeat_Jerky_C', type: 'consumable' }
      , { img: '3/31/Raw_Fish_Meat.png/53px-Raw_Fish_Meat.png?version=56c19ecf994e55cf06b8b6728d620d65', name: 'Raw Fish Meat', tag: 'PrimalItemConsumable_RawMeat_Fish_C', type: 'consumable' }
      , { img: 'b/b9/Cooked_Fish_Meat.png/53px-Cooked_Fish_Meat.png?version=f006baa7a8d4494aeb4af9af3555edf4', name: 'Cooked Fish Meat', tag: 'PrimalItemConsumable_CookedMeat_Fish_C', type: 'consumable' }
      , { img: '9/98/Raw_Prime_Fish_Meat.png/53px-Raw_Prime_Fish_Meat.png?version=e8f13f02fccaf25fe69357efdf4ff15b', name: 'Raw Prime Fish Meat', tag: 'PrimalItemConsumable_RawPrimeMeat_Fish_C', type: 'consumable' }
      , { img: 'b/b6/Cooked_Prime_Fish_Meat.png/53px-Cooked_Prime_Fish_Meat.png?version=fc3a4e591581dc34fcfcd7da80c7fe32', name: 'Cooked Prime Fish Meat', tag: 'PrimalItemConsumable_CookedPrimeMeat_Fish_C', type: 'consumable' }
      , { img: 'f/f4/Raw_Mutton.png/53px-Raw_Mutton.png?version=8b5efff1adca4f9f42fb4b8fa74028f4', name: 'Raw Mutton', tag: 'PrimalItemConsumable_RawMutton_C', type: 'consumable' }
      , { img: '2/26/Cooked_Lamb_Chop.png/53px-Cooked_Lamb_Chop.png?version=5bdacd9ad3c6833c16960f4bad537582', name: 'Cooked Lamb Chop', tag: 'PrimalItemConsumable_CookedLambChop_C', type: 'consumable' }
      , { img: '4/48/Filled_Fish_Basket_%28Aberration%29.png/53px-Filled_Fish_Basket_%28Aberration%29.png?version=d0a535a4f4c20463370743bc2ef8e6d3', name: 'Filled Fish Basket', tag: 'PrimalItem_FishBasketFilled_C', type: 'consumable' }
      , { img: '5/5c/Wyvern_Milk_%28Scorched_Earth%29.png/53px-Wyvern_Milk_%28Scorched_Earth%29.png?version=7553e4a9d048d3b4ab7ecdd82f0704e0', name: 'Wyvern Milk', tag: 'PrimalItemConsumable_WyvernMilk_C', type: 'consumable' }
      , { img: '6/60/Amarberry.png/53px-Amarberry.png?version=b8fc38e90ca8dc85267f4cea08aee43e', name: 'Amarberry', tag: 'PrimalItemConsumable_Berry_Amarberry_C', type: 'consumable' }
      , { img: '2/2f/Azulberry.png/53px-Azulberry.png?version=f2c2b5e79da156aaf50bb5beb9ad7906', name: 'Azulberry', tag: 'PrimalItemConsumable_Berry_Azulberry_C', type: 'consumable' }
      , { img: '0/00/Mejoberry.png/53px-Mejoberry.png?version=fcd4c7e46fc25de925a7baa310c78e94', name: 'Mejoberry', tag: 'PrimalItemConsumable_Berry_Mejoberry_C', type: 'consumable' }
      , { img: '2/29/Narcoberry.png/53px-Narcoberry.png?version=5baae2687d27d1ea908ea8c8360a792f', name: 'Narcoberry', tag: 'PrimalItemConsumable_Berry_Narcoberry_C', type: 'consumable' }
      , { img: 'c/cd/Stimberry.png/53px-Stimberry.png?version=d23abd2895068f089dfb86245fc09471', name: 'Stimberry', tag: 'PrimalItemConsumable_Berry_Stimberry_C', type: 'consumable' }
      , { img: 'd/dd/Tintoberry.png/53px-Tintoberry.png?version=8e5d4412322b7a8849473520b3e51911', name: 'Tintoberry', tag: 'PrimalItemConsumable_Berry_Tintoberry_C', type: 'consumable' }
      , { img: '0/0c/Cactus_Sap_%28Scorched_Earth%29.png/53px-Cactus_Sap_%28Scorched_Earth%29.png?version=df3e9d3aa3e0c518503d74491bf9bf4f', name: 'Cactus Sap', tag: 'PrimalItemConsumable_CactusSap_C', type: 'consumable' }
      , { img: '1/14/Citronal.png/53px-Citronal.png?version=6d4986d36d015d6ebfbef42c7462b401', name: 'Citronal', tag: 'PrimalItemConsumable_Veggie_Citronal_C', type: 'consumable' }
      , { img: '4/4e/Longrass.png/53px-Longrass.png?version=460d70be05b5fd5108c4e8e595ccf423', name: 'Longrass', tag: 'PrimalItemConsumable_Veggie_Longrass_C', type: 'consumable' }
      , { img: 'c/c3/Rockarrot.png/53px-Rockarrot.png?version=bb52ee32d0cd3c3894cdbc54300ac224', name: 'Rockarrot', tag: 'PrimalItemConsumable_Veggie_Rockarrot_C', type: 'consumable' }
      , { img: '3/34/Savoroot.png/53px-Savoroot.png?version=5342d88f7bf1bc441fee869de2c76b04', name: 'Savoroot', tag: 'PrimalItemConsumable_Veggie_Savoroot_C', type: 'consumable' }
      , { img: 'd/d7/Aggeravic_Mushroom_%28Aberration%29.png/53px-Aggeravic_Mushroom_%28Aberration%29.png?version=5bbc14186811154a205322584e9b4eaf', name: 'Aggeravic Mushroom', tag: 'PrimalItemResource_CommonMushroom_C', type: 'consumable' }
      , { img: 'd/de/Aquatic_Mushroom_%28Aberration%29.png/53px-Aquatic_Mushroom_%28Aberration%29.png?version=2cdbf33ebe7fe46fe482063abdeaf59f', name: 'Aquatic Mushroom', tag: 'PrimalItemConsumable_Mushroom_Aquatic_C', type: 'consumable' }
      , { img: 'a/a7/Ascerbic_Mushroom_%28Aberration%29.png/53px-Ascerbic_Mushroom_%28Aberration%29.png?version=46a5f24666b9af8849378c7a91476e99', name: 'Ascerbic Mushroom', tag: 'PrimalItemConsumable_Mushroom_Ascerbic_C', type: 'consumable' }
      , { img: '0/0a/Auric_Mushroom_%28Aberration%29.png/53px-Auric_Mushroom_%28Aberration%29.png?version=1a3138cb58335e486a06f41fdc155de5', name: 'Auric Mushroom', tag: 'PrimalItemConsumable_Mushroom_Auric_C', type: 'consumable' }
      , { img: '4/41/Mushroom_Brew_%28Aberration%29.png/53px-Mushroom_Brew_%28Aberration%29.png?version=ca03e64d3b8dec1a46662b7c4e6611ec', name: 'Mushroom Brew', tag: 'PrimalItemConsumable_Soup_MushroomSoup_C', type: 'consumable' }
      , { img: '6/63/Waterskin_%28Empty%29.png/53px-Waterskin_%28Empty%29.png?version=ecbf18b4cb5f4bfd07530c6e23cc3bcf', name: 'Waterskin (Empty)', tag: 'PrimalItemConsumable_WaterskinCraftable_C', type: 'consumable' }
      , { img: '2/26/Waterskin_%28Filled%29.png/53px-Waterskin_%28Filled%29.png?version=972e49bc715b3d3758a433422426b8a4', name: 'Waterskin (Filled)', tag: 'PrimalItemConsumable_WaterskinRefill_C', type: 'consumable' }
      , { img: '4/47/Water_Jar.png/53px-Water_Jar.png?version=edcb322851a649d88501a92ee6b3fbc2', name: 'Water Jar (Empty)', tag: 'PrimalItemConsumable_WaterJarCraftable_C', type: 'consumable' }
      , { img: 'd/df/Water_Jar_%28Full%29.png/53px-Water_Jar_%28Full%29.png?version=57d2ff2d7470e768c661ce755146ea62', name: 'Water Jar (Full)', tag: 'PrimalItemConsumable_WaterJarRefill_C', type: 'consumable' }
      , { img: 'f/f3/Iced_Water_Jar.png/53px-Iced_Water_Jar.png?version=d82830d9e86120743ee3545c39a94844', name: 'Iced Water Jar (Empty)', tag: 'PrimalItemConsumable_IcedWaterJar_C', type: 'consumable' }
      , { img: 'f/f3/Iced_Water_Jar.png/53px-Iced_Water_Jar.png?version=d82830d9e86120743ee3545c39a94844', name: 'Iced Water Jar (Full)', tag: 'PrimalItemConsumable_IcedWaterJarRefill_C', type: 'consumable' }
      , { img: '5/5e/Canteen.png/53px-Canteen.png?version=947abb4529d89c6fee4083340a2ed32a', name: 'Canteen (Empty)', tag: 'PrimalItemConsumable_CanteenCraftable_C', type: 'consumable' }
      , { img: '9/9a/Canteen_%28Full%29.png/53px-Canteen_%28Full%29.png?version=d9ed1af93430e07c6da23019ecfe9633', name: 'Canteen (Full)', tag: 'PrimalItemConsumable_CanteenRefill_C', type: 'consumable' }
      , { img: '1/12/Iced_Canteen.png/53px-Iced_Canteen.png?version=615ebf280390e86dca5167d0b79c520b', name: 'Iced Canteen (Empty)', tag: 'PrimalItemConsumable_IcedCanteen_C', type: 'consumable' }
      , { img: '1/12/Iced_Canteen.png/53px-Iced_Canteen.png?version=615ebf280390e86dca5167d0b79c520b', name: 'Iced Canteen (Full)', tag: 'PrimalItemConsumable_IcedCanteenRefill_C', type: 'consumable' }
      , { img: '5/5e/Beer_Liquid.png/53px-Beer_Liquid.png?version=3ed497f069f5f5a33815148c02fe3180', name: 'Beer Liquid', tag: 'PrimalItemResource_Beer_C', type: 'consumable' }
      , { img: '4/43/Beer_Jar.png/53px-Beer_Jar.png?version=1826cff6fe129deae7f4b73c6e52369d', name: 'Beer Jar', tag: 'PrimalItemConsumable_BeerJar_C', type: 'consumable' }
      , { img: '4/41/Bio_Toxin.png/53px-Bio_Toxin.png?version=2c407edbbedadefcc083a807e81059b9', name: 'Bio Toxin', tag: 'PrimalItemConsumable_JellyVenom_C', type: 'consumable' }
      , { img: '5/59/Medical_Brew.png/53px-Medical_Brew.png?version=9f9cfb6df9ee098b72cf9ae346e97b18', name: 'Medical Brew', tag: 'PrimalItemConsumable_HealSoup_C', type: 'consumable' }
      , { img: '8/81/Energy_Brew.png/53px-Energy_Brew.png?version=e56b741cc5f1779a0baadd21d8ff48ce', name: 'Energy Brew', tag: 'PrimalItemConsumable_StaminaSoup_C', type: 'consumable' }
      , { img: '5/54/Battle_Tartare.png/53px-Battle_Tartare.png?version=d45511bb84e4fb304756827dd7f4a097', name: 'Battle Tartare', tag: 'PrimalItemConsumable_Soup_BattleTartare_C', type: 'consumable' }
      , { img: 'f/f2/Broth_of_Enlightenment.png/53px-Broth_of_Enlightenment.png?version=3ec75ca9d6f8ef3f219c38a5f9ce4674', name: 'Broth of Enlightenment', tag: 'PrimalItemConsumable_TheHorn_C', type: 'consumable' }
      , { img: '4/47/Bug_Repellant.png/53px-Bug_Repellant.png?version=12dffe100cf2ae8a4b6f93a9a4894370', name: 'Bug Repellant', tag: 'PrimalItemConsumable_BugRepellant_C', type: 'consumable' }
      , { img: '8/89/Cactus_Broth_%28Scorched_Earth%29.png/53px-Cactus_Broth_%28Scorched_Earth%29.png?version=af036343eaeb594347938199990126e6', name: 'Cactus Broth', tag: 'PrimalItemConsumable_CactusBuffSoup_C', type: 'consumable' }
      , { img: 'd/d2/Calien_Soup.png/53px-Calien_Soup.png?version=19bddad699c51b03046cc6356b5afb30', name: 'Calien Soup', tag: 'PrimalItemConsumable_Soup_CalienSoup_C', type: 'consumable' }
      , { img: '4/4d/Enduro_Stew.png/53px-Enduro_Stew.png?version=6e615e9791f4f1ce372d04bf80ab14d0', name: 'Enduro Stew', tag: 'PrimalItemConsumable_Soup_EnduroStew_C', type: 'consumable' }
      , { img: '2/2e/Focal_Chili.png/53px-Focal_Chili.png?version=b22aa8644181bfb47bda20b7d6bd9aea', name: 'Focal Chili', tag: 'PrimalItemConsumable_Soup_FocalChili_C', type: 'consumable' }
      , { img: '7/70/Fria_Curry.png/53px-Fria_Curry.png?version=6bd5cf70237051d1b48f658d96a23d7d', name: 'Fria Curry', tag: 'PrimalItemConsumable_Soup_FriaCurry_C', type: 'consumable' }
      , { img: '1/12/Lazarus_Chowder.png/53px-Lazarus_Chowder.png?version=31d9b8165c3551c6f7b790c9b7d09c22', name: 'Lazarus Chowder', tag: 'PrimalItemConsumable_Soup_LazarusChowder_C', type: 'consumable' }
      , { img: '8/84/Lesser_Antidote.png/53px-Lesser_Antidote.png?version=c2c494ed18a5c45a8a22b18849477e39', name: 'Lesser Antidote', tag: 'PrimalItemConsumable_CureLow_C', type: 'consumable' }
      , { img: 'f/f1/Mindwipe_Tonic.png/53px-Mindwipe_Tonic.png?version=915ab35c8dc4219363525f47207e639b', name: 'Mindwipe Tonic', tag: 'PrimalItemConsumableRespecSoup_C', type: 'consumable' }
      , { img: '3/35/Shadow_Steak_Saute.png/53px-Shadow_Steak_Saute.png?version=fc0e16f28cc050a7a1b62a095ddf7280', name: 'Shadow Steak Saute', tag: 'PrimalItemConsumable_Soup_ShadowSteak_C', type: 'consumable' }
      , { img: '6/65/Soap.png/53px-Soap.png?version=0419e33537e02e37a3db533448c1636e', name: 'Soap', tag: 'PrimalItemConsumableSoap_C', type: 'consumable' }
      , { img: '5/5b/Sweet_Vegetable_Cake.png/53px-Sweet_Vegetable_Cake.png?version=9c65ec7c33c84cae014134e17f6e1452', name: 'Sweet Vegetable Cake', tag: 'PrimalItemConsumable_SweetVeggieCake_C', type: 'consumable' }
      , { img: 'a/a5/Giant_Bee_Honey.png/53px-Giant_Bee_Honey.png?version=2652e9ca9bef86a18488d1935fd92832', name: 'Giant Bee Honey', tag: 'PrimalItemConsumable_Honey_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Allosaurus Egg)', tag: 'PrimalItemConsumable_Kibble_Allo_C', type: 'consumable' }
      , { img: 'f/f5/Kibble_%28Ankylo_Egg%29.png/53px-Kibble_%28Ankylo_Egg%29.png?version=6f670d4317be89aef955d385db3fe2f6', name: 'Kibble (Ankylo Egg)', tag: 'PrimalItemConsumable_Kibble_AnkyloEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Araneo Egg)', tag: 'PrimalItemConsumable_Kibble_SpiderEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Archaeopteryx Egg)', tag: 'PrimalItemConsumable_Kibble_ArchaEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Argentavis Egg)', tag: 'PrimalItemConsumable_Kibble_ArgentEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Baryonyx Egg)', tag: 'PrimalItemConsumable_Kibble_BaryonyxEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Bronto Egg)', tag: 'PrimalItemConsumable_Kibble_SauroEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Camelsaurus Egg)', tag: 'PrimalItemConsumable_Kibble_Camelsaurus_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Carbonemys Egg)', tag: 'PrimalItemConsumable_Kibble_TurtleEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Carno Egg)', tag: 'PrimalItemConsumable_Kibble_CarnoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Compy Egg)', tag: 'PrimalItemConsumable_Kibble_Compy_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Dilo Egg)', tag: 'PrimalItemConsumable_Kibble_DiloEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Dimetrodon Egg)', tag: 'PrimalItemConsumable_Kibble_DimetroEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Dimorph Egg)', tag: 'PrimalItemConsumable_Kibble_DimorphEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Diplo Egg)', tag: 'PrimalItemConsumable_Kibble_DiploEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Dodo Egg)', tag: 'PrimalItemConsumable_Kibble_DodoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Featherlight Egg)', tag: 'PrimalItemConsumable_Kibble_LanternBirdEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Gallimimus Egg)', tag: 'PrimalItemConsumable_Kibble_GalliEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Glowtail Egg)', tag: 'PrimalItemConsumable_Kibble_LanternLizardEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Ichthyornis Egg)', tag: 'PrimalItemConsumable_Kibble_IchthyornisEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Iguanodon Egg)', tag: 'PrimalItemConsumable_Kibble_IguanodonEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Kairuku Egg)', tag: 'PrimalItemConsumable_Kibble_KairukuEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Kaprosuchus Egg)', tag: 'PrimalItemConsumable_Kibble_KaproEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Kentrosaurus Egg)', tag: 'PrimalItemConsumable_Kibble_KentroEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Lystrosaurus Egg)', tag: 'PrimalItemConsumable_Kibble_LystroEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Mantis Egg)', tag: 'PrimalItemConsumable_Kibble_Mantis_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Megalania Egg)', tag: 'PrimalItemConsumable_Kibble_Megalania_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Megalosaurus Egg)', tag: 'PrimalItemConsumable_Kibble_MegalosaurusEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Microraptor Egg)', tag: 'PrimalItemConsumable_Kibble_MicroraptorEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Moschops Egg)', tag: 'PrimalItemConsumable_Kibble_MoschopsEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Moth Egg)', tag: 'PrimalItemConsumable_Kibble_Moth_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Oviraptor Egg)', tag: 'PrimalItemConsumable_Kibble_OviraptorEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Pachy Egg)', tag: 'PrimalItemConsumable_Kibble_PachyEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Pachyrhino Egg)', tag: 'PrimalItemConsumable_Kibble_PachyRhinoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Parasaur Egg)', tag: 'PrimalItemConsumable_Kibble_ParaEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Pegomastax Egg)', tag: 'PrimalItemConsumable_Kibble_PegomastaxEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Pelagornis Egg)', tag: 'PrimalItemConsumable_Kibble_Pela_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Pteranodon Egg)', tag: 'PrimalItemConsumable_Kibble_PteroEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Pulmonoscorpius Egg)', tag: 'PrimalItemConsumable_Kibble_ScorpionEgg_C', type: 'consumable' }
      , { img: 'b/bd/Kibble_%28Quetzal_Egg%29.png/53px-Kibble_%28Quetzal_Egg%29.png?version=b2c7067222318efec72dec6b5f3673b6', name: 'Kibble (Quetzal Egg)', tag: 'PrimalItemConsumable_Kibble_QuetzEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Raptor Egg)', tag: 'PrimalItemConsumable_Kibble_RaptorEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Rex Egg)', tag: 'PrimalItemConsumable_Kibble_RexEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Rock Drake Egg)', tag: 'PrimalItemConsumable_Kibble_RockDrakeEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Sarco Egg)', tag: 'PrimalItemConsumable_Kibble_SarcoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Spino Egg)', tag: 'PrimalItemConsumable_Kibble_SpinoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Stego Egg)', tag: 'PrimalItemConsumable_Kibble_StegoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Tapejara Egg)', tag: 'PrimalItemConsumable_Kibble_TapejaraEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Terror Bird Egg)', tag: 'PrimalItemConsumable_Kibble_TerrorbirdEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Therizinosaurus Egg)', tag: 'PrimalItemConsumable_Kibble_TherizinoEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Thorny Dragon Egg)', tag: 'PrimalItemConsumable_Kibble_SpineyLizard_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Titanboa Egg)', tag: 'PrimalItemConsumable_Kibble_BoaEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Trike Egg)', tag: 'PrimalItemConsumable_Kibble_TrikeEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Troodon Egg)', tag: 'PrimalItemConsumable_Kibble_TroodonEgg_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Kibble (Vulture Egg)', tag: 'PrimalItemConsumable_Kibble_Vulture_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Basic Augmented Kibble', tag: 'PrimalItemConsumable_Kibble_Base_XSmall_EX_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Simple Augmented Kibble', tag: 'PrimalItemConsumable_Kibble_Base_Small_EX_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Regular Augmented Kibble', tag: 'PrimalItemConsumable_Kibble_Base_Medium_EX_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Superior Augmented Kibble', tag: 'PrimalItemConsumable_Kibble_Base_Large_EX_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Exceptional Augmented Kibble', tag: 'PrimalItemConsumable_Kibble_Base_XLarge_EX_C', type: 'consumable' }
      , { img: '8/8f/Kibble.png/53px-Kibble.png?version=e1324b38fe1836134f98e25d2536655d', name: 'Extraordinary Augmented Kibble', tag: 'PrimalItemConsumable_Kibble_Base_Special_EX_C', type: 'consumable' }
      , { img: 'd/d2/Blank.png/53px-Blank.png?version=ae8835e707a4c60885c9ef57c286a5be', name: 'Evil Emote', tag: 'PrimalItemConsumable_UnlockEmote_Evil_C', type: 'consumable' }
      , { img: 'c/c3/Gacha_Crystal_%28Extinction%29.png/53px-Gacha_Crystal_%28Extinction%29.png?version=4e2b1c06c188a6458d649d3e57316f17', name: 'Gacha Crystal', tag: 'PrimalItemConsumable_GachaPod_C', type: 'consumable' }
      , { img: 'a/a2/Unassembled_Enforcer_%28Extinction%29.png/53px-Unassembled_Enforcer_%28Extinction%29.png?version=8f92efe7c8471527bd04de78cb9d8b4c', name: 'Unassembled Enforcer', tag: 'PrimalItem_Spawner_Enforcer_C', type: 'consumable' }
      , { img: 'd/dd/Unassembled_Mek_%28Extinction%29.png/53px-Unassembled_Mek_%28Extinction%29.png?version=94ebb19c20af92d8196a26b40424937b', name: 'Unassembled Mek', tag: 'PrimalItem_Spawner_Mek_C', type: 'consumable' }
    ].map((_item) => {
      return new Item(_item.img, _item.name, _item.tag, _item.type);
    });

    harvest.seeds = [
      { img: 'a/af/Amarberry_Seed.png/53px-Amarberry_Seed.png?version=b788de806bb5740f668112e927889f4c', name: 'Amarberry Seed', tag: 'PrimalItemConsumable_Seed_Amarberry_C', type: 'seeds' }
      , { img: '5/56/Azulberry_Seed.png/53px-Azulberry_Seed.png?version=5c29f236b817886b3fc3b9d4e8a6c0dc', name: 'Azulberry Seed', tag: 'PrimalItemConsumable_Seed_Azulberry_C', type: 'seeds' }
      , { img: '9/95/Citronal_Seed.png/53px-Citronal_Seed.png?version=4e69da56e5003c16f04d5f080e7667f9', name: 'Citronal Seed', tag: 'PrimalItemConsumable_Seed_Citronal_C', type: 'seeds' }
      , { img: '3/36/Longrass_Seed.png/53px-Longrass_Seed.png?version=93c5eadc475680f15ef7818f7b0c8ef1', name: 'Longrass Seed', tag: 'PrimalItemConsumable_Seed_Longrass_C', type: 'seeds' }
      , { img: '8/85/Mejoberry_Seed.png/53px-Mejoberry_Seed.png?version=911785720befbf374e277fbc0844d45c', name: 'Mejoberry Seed', tag: 'PrimalItemConsumable_Seed_Mejoberry_C', type: 'seeds' }
      , { img: '5/55/Narcoberry_Seed.png/53px-Narcoberry_Seed.png?version=1769cc24fe5e0e75f6275ef37cfa765e', name: 'Narcoberry Seed', tag: 'PrimalItemConsumable_Seed_Narcoberry_C', type: 'seeds' }
      , { img: 'f/f4/Plant_Species_X_Seed.png/53px-Plant_Species_X_Seed.png?version=f46dcbcb5e2da09bded267a220ad0821', name: 'Plant Species X Seed', tag: 'PrimalItemConsumable_Seed_DefensePlant_C', type: 'seeds' }
      , { img: '4/46/Plant_Species_Y_Seed_%28Scorched_Earth%29.png/53px-Plant_Species_Y_Seed_%28Scorched_Earth%29.png?version=ee411024256fc2be6154172f7c9e5605', name: 'Plant Species Y Seed', tag: 'PrimalItemConsumable_Seed_PlantSpeciesY_C', type: 'seeds' }
      , { img: '7/71/Plant_Species_Z_Seed_%28Aberration%29.png/53px-Plant_Species_Z_Seed_%28Aberration%29.png?version=8a9d967b320ba1f0e3f41b61eebbc008', name: 'Plant Species Z Seed', tag: 'PrimalItemConsumable_Seed_PlantSpeciesZ_C', type: 'seeds' }
      , { img: '4/42/Rockarrot_Seed.png/53px-Rockarrot_Seed.png?version=af0b127c6f2c6e2682b9c5ed11288641', name: 'Rockarrot Seed', tag: 'PrimalItemConsumable_Seed_Rockarrot_C', type: 'seeds' }
      , { img: 'b/b9/Savoroot_Seed.png/53px-Savoroot_Seed.png?version=4ea5afe4267bfc8abf1999a3730c8730', name: 'Savoroot Seed', tag: 'PrimalItemConsumable_Seed_Savoroot_C', type: 'seeds' }
      , { img: '7/70/Stimberry_Seed.png/53px-Stimberry_Seed.png?version=08fd3747f35001dc66cde6884f6cbf72', name: 'Stimberry Seed', tag: 'PrimalItemConsumable_Seed_Stimberry_C', type: 'seeds' }
      , { img: '2/2a/Tintoberry_Seed.png/53px-Tintoberry_Seed.png?version=b520c13a94a52ca6b1b93c8512c2b1a2', name: 'Tintoberry Seed', tag: 'PrimalItemConsumable_Seed_Tintoberry_C', type: 'seeds' }
    ].map((_item) => {
      return new Item(_item.img, _item.name, _item.tag, _item.type);
    });

    return harvest;
  }

}
