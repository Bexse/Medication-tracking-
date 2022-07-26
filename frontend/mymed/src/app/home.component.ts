import { Component, OnInit } from '@angular/core';
import { GlobalstateService } from './globalStateService';

@Component({
  selector: 'app-home',
  template: `
    <div class="container pt-5">
      <div class="ms-4" *ngIf="welcome">
        <h2>Welcome {{ welcome }}</h2>
      </div>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  welcome: string = '';
  constructor(private stateSer: GlobalstateService) {
    stateSer.gloabalState.subscribe((state) => {
      this.welcome = state.data?.firstName;
    });
  }

  ngOnInit(): void {}
}
