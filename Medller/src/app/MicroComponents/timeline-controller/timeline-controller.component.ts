import { Component, OnInit } from '@angular/core';
import { NetworkCallsService } from '../../network-calls.service'
import { from } from 'rxjs/observable/from';
@Component({
  selector: 'app-timeline-controller',
  templateUrl: './timeline-controller.component.html',
  styleUrls: ['./timeline-controller.component.scss']
})
export class TimelineControllerComponent implements OnInit {


  constructor(public networkService: NetworkCallsService) { }
  searchField: String = '';

  ngOnInit() {
  }

  stopSelectedActions() {
    this.networkService.stopSelectedActions();
  }
  searchSelectedActions() {

  }

  onCreate() {
    this.searchField = 'Prakhar';
    if (this.searchField.length <= 0) {
      return;
    }
    this.networkService.createAction(this.searchField).subscribe();

    this.searchField = '';

  }

}
