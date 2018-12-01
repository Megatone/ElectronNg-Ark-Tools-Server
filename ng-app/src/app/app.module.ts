import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { GameUserSettingsComponent } from './game-user-settings/game-user-settings.component';
import { GameIniComponent } from './game-ini/game-ini.component';
import { CustomiceSpawnsComponent } from './customice-spawns/customice-spawns.component';
import { CustomiceStatsComponent } from './customice-stats/customice-stats.component';
import { CustomiceHarvestComponent } from './customice-harvest/customice-harvest.component';
import { CustomiceLevelComponent } from './customice-level/customice-level.component';
import { CustomiceEngramsComponent } from './customice-engrams/customice-engrams.component';
import { FormsModule } from '@angular/forms';
import { NgxFsModule } from 'ngx-fs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxElectronModule } from 'ngx-electron';
import { OutputSpawnConfigComponent } from './customice-spawns/modal/output-spawn-config/output-spawn-config.component';
import { OutputCustomStatsComponent } from './customice-stats/modal/output-custom-stats/output-custom-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    GameUserSettingsComponent,
    GameIniComponent,
    CustomiceSpawnsComponent,
    CustomiceStatsComponent,
    CustomiceHarvestComponent,
    CustomiceLevelComponent,
    CustomiceEngramsComponent,
    OutputSpawnConfigComponent,
    OutputCustomStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    NgxFsModule,
    MatExpansionModule,
    NgxSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxElectronModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    OutputSpawnConfigComponent,
    OutputCustomStatsComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
