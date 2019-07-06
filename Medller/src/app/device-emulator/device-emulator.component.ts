import { ViewChild, Component, OnInit, AfterViewInit } from '@angular/core';
// import { DataSetService } from './../DataSet/data-set.service';
import { WebsocketService } from './../DataSet/websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { NetworkCallsService } from './../network-calls.service';
const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
@Component({
  selector: 'app-device-emulator',
  templateUrl: './device-emulator.component.html',
  styleUrls: ['./device-emulator.component.css']
})
export class DeviceEmulatorComponent implements OnInit, AfterViewInit {
  @ViewChild('deviceEmulator', { static: true }) deviceEmulator;
  width: number;
  // height = 500;
  height: number;

  PRESSED = false;
  UNPRESSED = false;
  MOVED = false;
  touchPointer;

  WIDTH = 1080;
  HEIGHT = 1920;

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  };
  imgCanvas = null;
  canvasContext: any;
  objectUrl: any;
  img: HTMLImageElement;
  URL: any;
  blob: Blob;
  onloaded(message) {

    this.canvasContext.drawImage(this.img, 0, 0);
    this.img.onload = null;
    // this.img.src = BLANK_IMG;
    this.objectUrl = null;
    // this.blob = null;
  }

  constructor(private websocketService: WebsocketService, public networkService: NetworkCallsService) {
    this.connectSocketForStreaming();
    // this.connectSocket();




  }

  connectSocketForStreaming() {
    this.websocketService.getDeviceScreen(blob => {
      {

        this.blob = new Blob([blob], { type: 'image/jpeg' });
        this.URL = window.URL;
        this.img = new Image();
        this.objectUrl = this.URL.createObjectURL(this.blob);
        this.img.addEventListener('load', this.onloaded.bind(this));
        this.img.src = this.objectUrl;
        // this.blob = null;


      }
    });


  }

  ngOnInit() {



    this.canvasContext = this.deviceEmulator.nativeElement.getContext('2d');

    this.resizeEmulator();

    const subject = this.websocketService.sendTouchToDevice();

    subject.subscribe(obs => {
      console.log('subscribed');
    });

    Observable.interval(400).subscribe((time) => {

      if (this.PRESSED) {
        console.log('touchPointer', this.touchPointer);

        if (this.MOVED) {
          subject.next('m 0 ' + this.touchPointer + ' 50');
        } else {
          subject.next('d 0 ' + this.touchPointer + ' 50');
          this.MOVED = true;
        }
      } else {
        if (this.UNPRESSED) {


          console.log('touchPointer up', this.touchPointer);
          subject.next('u 0');
          this.UNPRESSED = false;
          this.MOVED = false;

        }
      }
    });

  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight): { width: any, height: any } {

    const ratio = [maxWidth / srcWidth, maxHeight / srcHeight];
    const _ratio = Math.min(ratio[0], ratio[1]);

    return { width: srcWidth * _ratio, height: srcHeight * _ratio };
  }

  resizeEmulator() {
    const aspectRatio = (1920 / 1080);


    const device = this.deviceEmulator.nativeElement;


    const _h = device.offsetHeight;
    const _w = device.offsetWidth;

    const dim = this.calculateAspectRatioFit(1080, 1920, _w, _h);
    console.log('dimmesnion', dim, _w, _h);
    const _aspectRatio = (_h / _w);


    let _W = 0, _H = 0;
    let scaleFactor = 1;

    if (_aspectRatio < aspectRatio) {
      // Fixed Height
      _W = _w;
      _H = _W / aspectRatio;
      scaleFactor = _w / 1080;
    } else {
      // Fixed Width
      _H = _h;
      _W = _H * aspectRatio;
      scaleFactor = _h / 1920;
    }
    // const width = device.offsetWidth;
    this.width = dim.width;
    this.height = dim.height;

    // this.deviceEmulator.nativeElement.width = this.width;

    this.canvasContext.canvas.width = this.width;
    this.canvasContext.canvas.height = this.height;

    console.log('width', this.width, this.height);

    this.networkService.changeScreenSizeStream(Number(this.width.toFixed()), Number(this.height.toFixed())).subscribe((data) => {
      console.log('changeScreenSizeStream', data);
    });
  }



  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // get the context
    const canvasEl: HTMLCanvasElement = this.deviceEmulator.nativeElement;
    this.canvasContext = canvasEl.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    console.log(canvasEl.width, canvasEl.height);

    // set some default properties about the line

    // we'll implement this method to start capturing mouse events
    this.onTouchListener(canvasEl);

  }

  private onTouchClick() {
    // console.log('onTouchClick');
  }
  private onTouchDown() {
    // console.log('onTouchDown');
  }

  private onTouchUp() {
    // console.log('onTouchUp');
  }

  private onTouchDrag() {
    // console.log('onTouchDrag');
  }

  private onDistinctEvent(x, y) {
    // console.log(x, y);
    if ('mousedown' === x && y === 'mouseup') {
      return true;
    }
    return false;
  }


  private eventIdentifier(x, y) {
    // console.log(x, y);

    if (y === 'mouseout') {
      console.log('Cancel');
      this.PRESSED = false;
      this.UNPRESSED = true;
      return;
    }

    if (y === 'mousedown') {
      this.PRESSED = true;
      console.log('PRESSED');
      return;
    }

    if (y === 'mouseup') {
      this.PRESSED = false;
      console.log('UNPRESSED');
      this.UNPRESSED = true;
      return;
    }
    if (this.PRESSED) {
      if (y === 'mousemove') {
        console.log('Moving');
        this.MOVED = true;
        return;
      }
    }


  }

  private trasform(event) {
    return { 'clientY': event['clientY'], 'clientX': event['clientX'], 'type': event['type'] };

  }

  private onTouchListener(canvasEl: HTMLCanvasElement) {

    Observable.fromEvent(canvasEl, 'mouseenter').switchMap((e) => {
      return Observable.fromEvent(canvasEl, 'mousedown');
    }).subscribe((event) => { this.onTouchDown(); });


    Observable.fromEvent(canvasEl, 'mouseenter').switchMap(
      (e1) => Observable.fromEvent(canvasEl, 'mousedown').switchMap((e2) => {
        return Observable.fromEvent(canvasEl, 'mousemove').takeUntil(Observable.fromEvent(canvasEl, 'mouseup'));
      })
        .takeUntil(Observable.fromEvent(canvasEl, 'mouseout'))
    )

      .subscribe((event) => { this.onTouchDrag(); });


    Observable.fromEvent(canvasEl, 'mousedown').switchMap((e) => {
      return Observable.fromEvent(canvasEl, 'mouseup')
        .takeUntil((Observable.fromEvent(canvasEl, 'mousedown')));
    }).subscribe((event) => { this.onTouchClick(); });

    Observable.merge(

      Observable.fromEvent(canvasEl, 'mouseup').map(this.trasform),
      Observable.fromEvent(canvasEl, 'mousemove').map(this.trasform),
      Observable.fromEvent(canvasEl, 'mouseout').map(this.trasform),
      Observable.fromEvent(canvasEl, 'mouseenter').map(this.trasform),
      Observable.fromEvent(canvasEl, 'mousedown').map(this.trasform),

    )
      // .distinctUntilChanged((x, y) => {
      //   return this.onDistinctEvent(x['type'], y['type']);
      // })
      .pairwise()
      // .filter((event) => this.onDistinctEvent(event[0]['type'], event[1]['type']))
      .subscribe(event => {
        // this.onDistinctEvent();
        this.eventIdentifier(event[0]['type'], event[1]['type']);
        // console.log('clicked');
      });


    Observable.fromEvent(canvasEl, 'mousemove').switchMap((e) => {
      return Observable.fromEvent(canvasEl, 'mouseup');
    }).subscribe((event) => { this.onTouchUp(); });


    Observable.merge(Observable.fromEvent(canvasEl, 'mousedown'),
      Observable.fromEvent(canvasEl, 'mouseup'),
      Observable.fromEvent(canvasEl, 'mousemove'),
      Observable.fromEvent(canvasEl, 'mouseout'),
      Observable.fromEvent(canvasEl, 'mouseenter')
    )
      .subscribe((res: MouseEvent) => {
        const rect = canvasEl.getBoundingClientRect();
        // console.log('event', res['type']);
        // previous and current position with the offset
        const currentPos = {
          x: res.clientX - rect.left,
          y: res.clientY - rect.top
        };

        const X = Number(currentPos.x * (this.WIDTH / this.width)).toFixed();
        const Y = Number(currentPos.y * (this.HEIGHT / this.height)).toFixed();
        this.touchPointer = X + ' ' + Y;
        // console.log(X, Y, 'event');
        // this.websocketService.setTouchEvent('d', X, Y);

      });

  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable.merge(
      // this will capture all mousedown events from teh canvas element
      Observable.fromEvent(canvasEl, 'mousedown')
        .switchMap((e) => {
          return Observable
            // after a mouse down, we'll record all mouse moves
            .fromEvent(canvasEl, 'mousemove')
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a mouseUp event
            .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            .pairwise();
        }),

      Observable.fromEvent(canvasEl, 'mousedown').map(data => {
        return [data, data];
      }
      )
    )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        console.log('event', res);
        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        const X = Number(currentPos.x * (this.WIDTH / this.width)).toFixed();
        const Y = Number(currentPos.y * (this.HEIGHT / this.height)).toFixed();
        // console.log(X, Y, 'event');
        this.websocketService.setTouchEvent('d', X, Y);

      });
  }
}
