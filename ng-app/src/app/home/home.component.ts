import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public startGameUserSettings(): void {
    this.router.navigate(['/game-user-settings']);
  }

  public importGameUserSeettings(): void {

  }

  public startGameIni(): void {
    this.router.navigate(['/game-ini']);
  }

  public importGameUIni(): void {

  }

}
