import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NgRx-Demo-App';
  constructor(private store: Store) {
    // if (window.Cypress) {
    //   window.store = this.store;
    // }
  }
}
