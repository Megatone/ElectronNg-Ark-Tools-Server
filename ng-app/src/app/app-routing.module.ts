import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameUserSettingsComponent } from './game-user-settings/game-user-settings.component';
import { GameIniComponent } from './game-ini/game-ini.component';
import { CustomSpawnsComponent } from './custom-spawns/custom-spawns.component';
import { CustomStatsComponent } from './custom-stats/custom-stats.component';
import { CustomLevelComponent } from './custom-level/custom-level.component';
import { CustomHarvestComponent } from './custom-harvest/custom-harvest.component';
import { CustomEngramsComponent } from './custom-engrams/custom-engrams.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'HOME', step: 0 } },
  { path: 'game-user-settings', component: GameUserSettingsComponent, data: { title: 'GAME USER SETTINGS', step: 0 } },
  { path: 'game-ini', component: GameIniComponent, data: { title: 'GAME INI', step: 1 } },
  { path: 'custom-level', component: CustomLevelComponent, data: { title: 'CUSTOM LEVEL', step: 2 } },
  { path: 'custom-stats', component: CustomStatsComponent, data: { title: 'CUSTOM STATS', step: 3 } },
  { path: 'custom-engrams', component: CustomEngramsComponent, data: { title: 'CUSTOM ENGRAMS', step: 4 } },
  { path: 'custom-harvest', component: CustomHarvestComponent, data: { title: 'CUSTOM HARVEST', step: 5 } },
  { path: 'custom-spawns', component: CustomSpawnsComponent, data: { title: 'CUSTOM SPAWNS', step: 6 } },
  { path: '**', redirectTo: '/home', pathMatch: 'full', data: { step: 0 } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
