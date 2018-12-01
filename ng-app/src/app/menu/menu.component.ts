import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public title: String = 'Home';

  public constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const route = event.state.root.firstChild;
        this.title = route.data.title;
      }
    });
  }


}
