import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameUserSettingsComponent } from './game-user-settings/game-user-settings.component';
import { GameIniComponent } from './game-ini/game-ini.component';
import { CustomiceSpawnsComponent } from './customice-spawns/customice-spawns.component';
import { CustomiceStatsComponent } from './customice-stats/customice-stats.component';
import { CustomiceLevelComponent } from './customice-level/customice-level.component';
import { CustomiceHarvestComponent } from './customice-harvest/customice-harvest.component';
import { CustomiceEngramsComponent } from './customice-engrams/customice-engrams.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'HOME' } },
  { path: 'game-user-settings', component: GameUserSettingsComponent, data: { title: 'GAME USER SETTINGS' } },
  { path: 'game-ini', component: GameIniComponent, data: { title: 'GAME INI' } },
  { path: 'customice-spawns', component: CustomiceSpawnsComponent, data: { title: 'CUSTOMICE SPAWNS' } },
  { path: 'customice-stats', component: CustomiceStatsComponent, data: { title: 'CUSTOMICE STATS' } },
  { path: 'customice-level', component: CustomiceLevelComponent, data: { title: 'CUSTOMICE LEVEL' } },
  { path: 'customice-harvest', component: CustomiceHarvestComponent, data: { title: 'CUSTOMICE HARVEST' } },
  { path: 'customice-engrams', component: CustomiceEngramsComponent, data: { title: 'CUSTOMICE ENGRAMS' } },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
