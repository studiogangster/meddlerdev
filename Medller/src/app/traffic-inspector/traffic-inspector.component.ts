import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './../DataSet/websocket.service';
import { ListItem } from './../MicroComponents/traffic-data-item/traffic-data-item.component'

@Component({
  selector: 'app-traffic-inspector',
  templateUrl: './traffic-inspector.component.html',
  styleUrls: ['./traffic-inspector.component.scss']
})
export class TrafficInspectorComponent implements OnInit {
  HELL = [1, 23, 12, 312, 3123, 12, 312, 41, 23, 21, 31, 3];

  buffer: ListItem[] = [];

  trackBy: Function = this.webSocket.dataSetService.trackBy;

  get networkTrafficReuests() {
    // return this.dataSet.networkRequests;
    // return this.webSocket.getNetworkTraffic();
    return this.webSocket.dataSetService.networkRequests;
    // return [];
  }




  constructor(private webSocket: WebsocketService) {

    this.webSocket.getNetworkTraffic().subscribe();

    for(let i=0; i<90; i++)
      this.fetchMore()





  }

  fetchMore() {
    console.log('fetchMore');
    this.buffer.push({"url":"dasdasdasdadasa", "method":"POST"})
  }

  ngOnInit() {
  }

}
