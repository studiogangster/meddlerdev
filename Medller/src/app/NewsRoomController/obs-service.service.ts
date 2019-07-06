
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as Rx from 'rxjs/';


@Injectable()
export class ObsServiceService {


  scenes = []
  currentScene = ""
  nextScene = ""

  ws: WebSocket = null;
  touchCoordinates: String = null;
  private create(url): Rx.Subject<MessageEvent> {
    if(this.ws)
      return 
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

  getScenes(){
    return this.scenes
  }

  setNextScene(sceneName){
    console.log('setNextScene', sceneName)
    this.nextScene = sceneName;
  }

  getNextScene(){
    return this.nextScene
  }

  sendMessage(message){
    try{
        this.ws.send(JSON.stringify(message) )
        console.log('send', message)
    }catch(err){
      console.log('error', err)
    }
    console.log('SendMessage', message)
  }

  getCurrentScene(){
    return this.currentScene
  }

  getUpdates(onRecieve): Subject<any> {

    const subject = this.create('ws://10.150.77.107:3000')

    // subject.subscribe( ()=> {
    //     console.log('subjec')
    // } )
    subject.subscribe((data) => {
      
      onRecieve(data);
    },
      (err) => {
        console.log('error', err)
        setTimeout(() => {
          this.getUpdates(onRecieve);
        }, 2000);
      }, () => {
        setTimeout(() => {
          this.getUpdates(onRecieve);
        }, 2000);
      }

    );
    
    return subject;

  }



  constructor() {
    // this.getNetworkTraffic();
    this.getUpdates( (updates)=>{
      updates =  JSON.parse( updates.data )
      try{
        switch( updates['updateType'] ){
          case "GetSceneList":
              this.scenes = updates.scenes
              this.currentScene = updates.currentScene
              console.log("GetSceneList")
          break;

          case "SwitchScenes":
                this.nextScene = ''
                this.currentScene = updates.sceneName
                
          break;

          
        }
      } catch(err){

      }
      console.log('getUpdates', updates)
    } )
  }


  

}
