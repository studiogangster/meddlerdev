import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { DataSetService } from './data-set.service';
import * as Rx from 'rxjs/';

import { URL } from '../EnviromentConfig';



@Injectable()
export class WebsocketService {


  ws: WebSocket = null;
  touchCoordinates: String = null;
  private create(url): Rx.Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
        }
      },
    };

    return Rx.Subject.create(observer, observable);
  }

  getDeviceScreen(onRecieve): Subject<any> {
    const subject = Rx.Observable.webSocket({
      url: `ws://${URL}:9002`,
      deserializer: (e: MessageEvent) => {
        return (e.data);
      }

    });

    // subject.subscribe( ()=> {
    //     console.log('subjec')
    // } )
    subject.subscribe((data) => {
      
      onRecieve(data);
    },
      (err) => {
        console.log('error', err)
        setTimeout(() => {
          this.getDeviceScreen(onRecieve);
        }, 2000);
      }, () => {
        setTimeout(() => {
          this.getDeviceScreen(onRecieve);
        }, 2000);
      }

    );

    return subject;

  }
  sendTouchToDevice(): Subject<any> {

    const subject = this.create(`ws://${URL}:9001`);

    return subject;

  }


  setTouchEvent(event, x, y) {
    console.log('toche', x, y);
    if (event === 'u') {
      this.touchCoordinates = (event + ' 0 ');

    } else {
      this.touchCoordinates = (event + ' 0 ' + x + ' ' + y + ' ' + 50);
    }

  }

  constructor(public dataSetService: DataSetService) {
    // this.getNetworkTraffic();
  }


  getNetworkTraffic(): Subject<any> {
    const subject = Rx.Observable.webSocket(`ws://${URL}:3003`);
    subject.subscribe((data) => {
      if (data['type'] === 'request') {
        // this.networkRequests.push(data['data']['new_val']);
        console.log('traffic');
        this.dataSetService.addRequestFromSocket(data['data']['new_val']);
        // console.log('data', data['data']['new_val']['host']);
      } else if (data['type'] === 'response') {
        // this.networkResponses.push(data);
        // this.dataSetService.addRequestFromSocket(data['data']['new_val']);
        // console.log('data', data['data']['new_val']['host']);
      }
    },
      (err) => {

        setTimeout(() => {
          // this.getNetworkTraffic();
        }, 2000);
      }, () => {

        setTimeout(() => {
          // this.getNetworkTraffic();
        }, 2000);
      }

    );

    return subject;

  }

}
