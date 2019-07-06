import { Component } from '@angular/core';
import {fadeAnimation} from './pentest/animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation] 
})
export class AppComponent {
  title = 'app';


  constructor(){

  
  }

  getState(outlet) {

   
    return outlet.activatedRouteData.state;
  }

}
