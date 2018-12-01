import { Injectable } from '@angular/core';
import { Map } from './models/Map';
import { Entry } from './models/Entry';
import { FsService } from 'ngx-fs';
import { Mod } from './models/Mod';
import { Dino } from './models/Dino';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private fs: FsService) { }

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
    if (this.fs.isElectronApp) {
      (<any>this.fs.fs).readdirSync(dir).forEach((file) => {
        if (file.indexOf('.umap') > -1) {
          name = file.split('.umap')[0];
        }
      });
    }
    return name;
  }

  public getCreaturesAsync(dir, dinos: Array<Dino> = []): Array<Dino> {
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
  }

  public getMaps(): Array<Map> {
    const maps: Array<Map> = [];
    const extinction: Map = new Map('Extinction');

    extinction.entries.push(new Entry('DinoSpawnEntriesQuetz_EX',
      [
        'Quetzal'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_CityCenter',
      [
        'Dodo',
        'Parasaur',
        'Triceratops',
        'Megaloceros',
        'Pteranodon',
        'Dilophosaur',
        'Oviraptor',
        'Carbonemys',
        'Compy',
        'Lystrosaurus',
        'Moschops',
        'Scout',
        'Defense Unit',
        'Enforcer',
        'Meganeura',
        'Titanomyrma Drone',
        'Titanomyrma Soldier',
        'Ichthyornis',
        'Ankylosaurus',
        'Stegosaurus',
        'Phiomia',
        'Archaeopteryx',
        'Iguanodon',
        'Mesopithecus',
        'Dung Beetle',
        'Achatina',
        'Tapejara',
        'Megatherium'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_CityCenter_DangerClose',
      [
        'Dodo',
        'Raptor',
        'Triceratops',
        'Megaloceros',
        'Pteranodon',
        'Dilophosaur',
        'Oviraptor',
        'Carbonemys',
        'Compy',
        'Lystrosaurus',
        'Moschops',
        'Scout',
        'Defense Unit',
        'Enforcer',
        'Meganeura',
        'Titanomyrma Drone',
        'Titanomyrma Soldier',
        'Araneo',
        'Pulmonoscorpius',
        'Hyaenodon',
        'Carnotaurus',
        'Terror Bird',
        'Tapejara'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_CityObelisk',
      [
        'Dodo',
        'Parasaur',
        'Triceratops',
        'Megaloceros',
        'Pteranodon',
        'Dilophosaur',
        'Compy',
        'Scout',
        'Defense Unit',
        'Enforcer',
        'Ankylosaurus',
        'Stegosaurus',
        'Kentrosaurus',
        'Pachy',
        'Doedicurus',
        'Carnotaurus',
        'Argentavis',
        'Pulmonoscorpius',
        'Rex',
        'Sabertooth',
        'Raptor'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_CityTier2_Building',
      [
        'Pteranodon',
        'Scout',
        'Enforcer',
        'Archaeopteryx',
        'Tapejara',
        'Araneo'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_CityTier2_Building_DangerClose',
      [
        'Pteranodon',
        'Scout',
        'Enforcer',
        'Archaeopteryx',
        'Tapejara',
        'Araneo',
        'Carnotaurus',
        'Dilophosaur',
        'Argentavis',
        'Microraptor'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_CityTier2_Fliers',
      [
        'Pteranodon',
        'Scout',
        'Enforcer',
        'Archaeopteryx',
        'Tapejara'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_City_Park2',
      [
        'Dodo',
        'Parasaur',
        'Triceratops',
        'Megaloceros',
        'Pteranodon',
        'Dilophosaur',
        'Oviraptor',
        'Carbonemys',
        'Compy',
        'Scout',
        'Defense Unit',
        'Enforcer',
        'Meganeura',
        'Titanomyrma Drone',
        'Titanomyrma Soldier',
        'Ichthyornis',
        'Ankylosaurus',
        'Stegosaurus',
        'Equus',
        'Microraptor',
        'Ovis',
        'Pachyrhinosaurus',
        'Gallimimus',
        'Diplodocus',
        'Phiomia',
        'Rex',
        'Brontosaurus',
        'Raptor'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_City_Buffer_1',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Corrupted Raptor',
        'Corrupted Pteranodon',
        'Ankylosaurus',
        'Stegosaurus',
        'Carnotaurus',
        'Raptor',
        'Pulmonoscorpius',
        'Araneo',
        'Titanoboa'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_City_Buffer_2',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Corrupted Raptor',
        'Corrupted Pteranodon',
        'Ankylosaurus',
        'Stegosaurus',
        'Carnotaurus',
        'Raptor',
        'Defense Unit',
        'Scout',
        'Pulmonoscorpius',
        'Araneo',
        'Titanoboa'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_Easy',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Corrupted Raptor',
        'Corrupted Chalicotherium',
        'Corrupted Pteranodon',
        'Ankylosaurus',
        'Stegosaurus',
        'Carnotaurus',
        'Raptor',
        'Gasbags'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_Hard',
      [
        'Corrupted Raptor',
        'Corrupted Paraceratherium',
        'Corrupted Wyvern',
        'Corrupted Rock Drake',
        'Corrupted Reaper King',
        'Corrupted Rex',
        'Corrupted Spino',
        'Rex',
        'Spino',
        'Brontosaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_Medium',
      [
        'Corrupted Stegosaurus',
        'Corrupted Paraceratherium',
        'Corrupted Raptor',
        'Corrupted Spino',
        'Corrupted Arthropluera',
        'Corrupted Rex',
        'Corrupted Giganotosaurus',
        'Dire Bear',
        'Therizinosaur',
        'Thylacoleo',
        'Gasbags',
        'Tapejara'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_DesertCave',
      [
        'Arthropluera',
        'Mantis',
        'Onyc',
        'Titanoboa',
        'Rubble Golem',
        'Achatina'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_DesertMountain',
      [
        'Doedicurus',
        'Procoptodon',
        'Carnotaurus',
        'Tapejara',
        'Ankylosaurus',
        'Meganeura',
        'Dimetrodon',
        'Rock Elemental',
        'Equus',
        'Kentrosaurus',
        'Yutyrannus',
        'Carnotaurus',
        'Velonasaur',
        'Pulmonoscorpius',
        'Titanomyrma Drone',
        'Titanomyrma Soldier',
        'Morellatops',
        'Thorny Dragon'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_DesertOasis',
      [
        'Doedicurus',
        'Procoptodon',
        'Allosaurus',
        'Stegosaurus',
        'Tapejara',
        'Ankylosaurus',
        'Meganeura',
        'Dimetrodon',
        'Spino',
        'Equus',
        'Kentrosaurus',
        'Dodo',
        'Velonasaur',
        'Pulmonoscorpius',
        'Titanomyrma Drone',
        'Titanomyrma Soldier',
        'Lymantria',
        'Water Jug Bug',
        'Morellatops',
        'Thorny Dragon'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_Forest',
      [
        'Dodo',
        'Parasaur',
        'Triceratops',
        'Stegosaurus',
        'Dilophosaur',
        'Raptor',
        'Phiomia',
        'Carbonemys',
        'Carnotaurus',
        'Titanomyrma Drone',
        'Titanomyrma Soldier',
        'Compy',
        'Meganeura',
        'Dimorphodon',
        'Diplodocus',
        'Mesopithecus',
        'Pachy',
        'Oviraptor',
        'Lystrosaurus',
        'Tapejara',
        'Chalicotherium',
        'Moschops',
        'Therizinosaur',
        'Troodon',
        'Iguanodon',
        'Gacha'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_ShallowWater_Cave',
      [
        'Coelacanth',
        'Kaprosuchus',
        'Piranha',
        'Sarco'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_ShallowWater_Desert',
      [
        'Coelacanth',
        'Kaprosuchus',
        'Piranha',
        'Hesperornis'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('Ext_DinoSpawnEntries_ShallowWater_Ice',
      [
        'Coelacanth',
        'Kairuku',
        'Sabertooth Salmon',
        'Hesperornis'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_City_Trench',
      [
        'Megalosaurus',
        'Megalania',
        'Sarco',
        'Beelzebufo',
        'Kaprosuchus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_ParkWater',
      [
        'Coelacanth',
        'Sabertooth Salmon',
        'Otter',
        'Sarco',
        'Beelzebufo',
        'Kaprosuchus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_ParkWater2',
      [
        'Coelacanth',
        'Otter',
        'Baryonyx',
        'Diplocaulus',
        'Dimetrodon',
        'Kaprosuchus',
        'Sarco',
        'Beelzebufo',
        'Piranha',
        'Sabertooth Salmon'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_DesertBuffer',
      [
        'Dilophosaur',
        'Morellatops',
        'Direwolf',
        'Pteranodon',
        'Corrupted Pteranodon',
        'Stegosaurus',
        'Carnotaurus',
        'Raptor',
        'Gasbags',
        'Pulmonoscorpius',
        'Triceratops'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_ForbiddenZone',
      [
        'Corrupted Giganotosaurus',
        'Corrupted Rex',
        'Corrupted Raptor',
        'Corrupted Chalicotherium',
        'Corrupted Wyvern',
        'Corrupted Carnotaurus',
        'Corrupted Deathworm'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_North',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Chalicotherium',
        'Corrupted Chalicotherium',
        'Corrupted Pteranodon',
        'Ankylosaurus',
        'Stegosaurus',
        'Rex',
        'Pteranodon',
        'Gasbags',
        'Corrupted Rex',
        'Corrupted Rock Drake',
        'Triceratops',
        'Argentavis',
        'Therizinosaur',
        'Thylacoleo',
        'Sabertooth',
        'Dodo',
        'Dire Bear',
        'Corrupted Giganotosaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_NorthCraterForest',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Chalicotherium',
        'Corrupted Chalicotherium',
        'Corrupted Pteranodon',
        'Ankylosaurus',
        'Stegosaurus',
        'Rex',
        'Pteranodon',
        'Corrupted Rock Drake',
        'Triceratops',
        'Argentavis',
        'Therizinosaur',
        'Thylacoleo',
        'Sabertooth',
        'Corrupted Reaper King'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_OilFields',
      [
        'Corrupted Dilophosaur',
        'Corrupted Spino',
        'Spino',
        'Arthropluera',
        'Corrupted Arthropluera',
        'Corrupted Pteranodon',
        'Corrupted Paraceratherium',
        'Paraceratherium',
        'Carnotaurus',
        'Brontosaurus',
        'Gasbags',
        'Titanoboa',
        'Corrupted Carnotaurus',
        'Corrupted Chalicotherium',
        'Corrupted Stegosaurus',
        'Stegosaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_OilFields_Fliers',
      [
        'Corrupted Dilophosaur',
        'Corrupted Pteranodon',
        'Gasbags'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_SnowBuffer',
      [
        'Megaloceros',
        'Ankylosaurus',
        'Direwolf',
        'Argentavis',
        'Corrupted Pteranodon',
        'Stegosaurus',
        'Yutyrannus',
        'Dire Bear',
        'Rex',
        'Chalicotherium',
        'Giganotosaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_South',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Corrupted Raptor',
        'Corrupted Pteranodon',
        'Dilophosaur',
        'Stegosaurus',
        'Carnotaurus',
        'Raptor',
        'Gasbags',
        'Triceratops',
        'Stegosaurus',
        'Pulmonoscorpius',
        'Araneo',
        'Rex',
        'Corrupted Rex',
        'Brontosaurus',
        'Pteranodon',
        'Dodo',
        'Pteranodon',
        'Corrupted Carnotaurus',
        'Dimetrodon'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Wasteland_Sulfur',
      [
        'Corrupted Dilophosaur',
        'Corrupted Stegosaurus',
        'Corrupted Triceratops',
        'Corrupted Raptor',
        'Corrupted Pteranodon',
        'Stegosaurus',
        'Carnotaurus',
        'Raptor',
        'Gasbags',
        'Pulmonoscorpius',
        'Araneo',
        'Titanoboa',
        'Spino',
        'Corrupted Spino',
        'Arthropluera',
        'Dung Beetle',
        'Meganeura'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('T_Ext_DinoSpawnEntriesSnow_1',
      [
        'Direwolf',
        'Megaloceros',
        'Ankylosaurus',
        'Mammoth',
        'Sabertooth',
        'Snow Owl',
        'Woolly Rhino',
        'Chalicotherium',
        'Ovis',
        'Daeodon',
        'Megatherium',
        'Yutyrannus',
        'Dire Bear',
        'Managarmr'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('T_Ext_DinoSpawnEntriesSnow_Purlovia',
      [
        'Direwolf',
        'Megaloceros',
        'Ankylosaurus',
        'Mammoth',
        'Sabertooth',
        'Snow Owl',
        'Woolly Rhino',
        'Chalicotherium',
        'Purlovia',
        'Ovis',
        'Daeodon',
        'Megatherium',
        'Rex',
        'Dire Bear'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('T_Ext_DinoSpawnEntriesSnow_TEMP',
      [
        'Direwolf',
        'Megaloceros',
        'Ankylosaurus',
        'Mammoth',
        'Sabertooth',
        'Snow Owl',
        'Woolly Rhino',
        'Chalicotherium',
        'Purlovia',
        'Ovis',
        'Daeodon',
        'Megatherium'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntriesBee',
      [
        'Giant Queen Bee'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntriesCaveTek_Hard',
      [
        'Rex',
        'Allosaurus',
        'Kaprosuchus',
        'Microraptor',
        'Therizinosaur',
        'Terror Bird',
        'Baryonyx',
        'Dilophosaur',
        'Arthropluera',
        'Megalosaurus',
        'Purlovia',
        'Yutyrannus',
        'Carnotaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntriesCaveTek_Hard_11',
      [
        'Rex',
        'Allosaurus',
        'Kaprosuchus',
        'Microraptor',
        'Therizinosaur',
        'Terror Bird',
        'Baryonyx',
        'Dilophosaur',
        'Arthropluera',
        'Megalosaurus',
        'Purlovia',
        'Yutyrannus',
        'Carnotaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntriesCaveTek_Hard_12',
      [
        'Rex',
        'Allosaurus',
        'Kaprosuchus',
        'Microraptor',
        'Therizinosaur',
        'Terror Bird',
        'Baryonyx',
        'Dilophosaur',
        'Arthropluera',
        'Megalosaurus',
        'Purlovia',
        'Yutyrannus',
        'Carnotaurus'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntriesIceCave',
      [
        'Direwolf',
        'Purlovia',
        'Polar Bear',
        'Yeti'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntriesSwamp',
      [
        'Dilophosaur',
        'Phiomia',
        'Meganeura',
        'Dimorphodon',
        'Paraceratherium',
        'Titanoboa',
        'Achatina'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_Beavers',
      [
        'Castoroides'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    extinction.entries.push(new Entry('DinoSpawnEntries_RedwoodWater',
      [
        'Coelacanth',
        'Sabertooth Salmon',
        'Otter'
      ].map((d) => {
        return new Dino(d);
      })
    ));

    maps.push(extinction);

    const ragnarok: Map = new Map('Ragnarok');
    maps.push(ragnarok);

    return maps;
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

}
