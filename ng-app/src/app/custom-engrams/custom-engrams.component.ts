
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssistantService } from '../services/assistant.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-custom-engrams',
  templateUrl: './custom-engrams.component.html',
  styleUrls: ['./custom-engrams.component.scss']
})
export class CustomEngramsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(
    private assistantService: AssistantService
  ) { }

  ngOnInit(): void {
    this.subscription = this.assistantService.order$.subscribe((order) => {
      this.assistantService.confirm(order);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
