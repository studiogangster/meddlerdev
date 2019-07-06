import { Component, OnInit , Input } from '@angular/core';


export interface ListItem {

  url?: string;
  method?: string;
}

@Component({
  selector: 'list-item',
  templateUrl: './traffic-data-item.component.html',
  styleUrls: ['./traffic-data-item.component.scss']
})
export class TrafficDataItemComponent implements OnInit {

  @Input()
  item: ListItem;

  constructor() { }

  ngOnInit() {
  }

}
