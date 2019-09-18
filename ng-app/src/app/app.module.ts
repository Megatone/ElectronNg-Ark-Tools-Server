import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
  MatSliderModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  GestureConfig
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { GameUserSettingsComponent } from './game-user-settings/game-user-settings.component';
import { GameIniComponent } from './game-ini/game-ini.component';
import { CustomSpawnsComponent } from './custom-spawns/custom-spawns.component';
import { CustomStatsComponent } from './custom-stats/custom-stats.component';
import { CustomHarvestComponent } from './custom-harvest/custom-harvest.component';
import { CustomLevelComponent } from './custom-level/custom-level.component';
import { CustomEngramsComponent } from './custom-engrams/custom-engrams.component';
import { FormsModule } from '@angular/forms';
import { NgxFsModule } from 'ngx-fs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxElectronModule } from 'ngx-electron';
import { ModalOutputConfigComponent } from './modals/modal-output-config/modal-output-config.component';
import { HttpClientModule } from '@angular/common/http';
import { AssistantService } from './services/assistant.service';
import { LevelChartComponent } from './custom-level/level-chart/level-chart.component';
import { EngramsChartComponent } from './custom-level/engrams-chart/engrams-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    GameUserSettingsComponent,
    GameIniComponent,
    CustomSpawnsComponent,
    CustomStatsComponent,
    CustomHarvestComponent,
    CustomLevelComponent,
    CustomEngramsComponent,
    ModalOutputConfigComponent,
    LevelChartComponent,
    EngramsChartComponent
  ],
  imports: [
    AppRoutingModule,
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
    MatInputModule,
    HttpClientModule,
    ChartsModule,
    MatSliderModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    AssistantService
  ],
  entryComponents: [
    ModalOutputConfigComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
