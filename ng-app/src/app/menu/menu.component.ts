import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AssistantService } from '../services/assistant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  public title: String = 'Home';
  public step = 0;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private assistantService: AssistantService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        const route = event.state.root.firstChild;
        this.title = route.data.title;
        this.step = route.data.step;
      }
    });

    this.assistantService.confirmed$.subscribe((confirmation) => {
      this.router.navigate([this.router.config.filter((route) => {
        return route.data.step === confirmation;
      })[0].path]);
    });
  }

  public onActivate($event): void {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 100);
  }

  public nextStep() {
    this.assistantService.ordenate(this.step + 1);

    /* 
        this.router.navigate([this.router.config.filter((route) => {
          return route.data.step === (this.step + 1);
        })[0].path]); */
  }
  public backStep() {
    this.assistantService.ordenate(this.step - 1);
    /* this.router.navigate([this.router.config.filter((route) => {
      return route.data.step === (this.step - 1);
    })[0].path]); */
  }

  public finishStep() {
    this.router.navigate(['/home']);
  }

}
