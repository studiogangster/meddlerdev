import { Component, OnInit, Input } from '@angular/core';
import {SideMenuItem} from './../DataModels';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  position: true;

@Input()
  item : SideMenuItem

  constructor(private router: Router) { }

  goTo(){
    console.log(this.item.getRoute)
      this.router.navigate(this.item.getRoute)
  }

  ngOnInit() {
  }

}
