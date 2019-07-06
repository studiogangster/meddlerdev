import { Component, OnInit } from '@angular/core';
import { ObsServiceService } from '../obs-service.service'
import {  Router } from '@angular/router';
@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./scenes.component.scss']
})
export class ScenesComponent implements OnInit {

  constructor(public _obsServiceService : ObsServiceService, private router: Router) { 
  }

  ngOnInit() {
  }

  onClick(clickedScene){
    this._obsServiceService.setNextScene(clickedScene)
    this._obsServiceService.sendMessage( {a: 'ss' , d:clickedScene } )
    console.log('onClick', clickedScene)
  }

  zoom(event:any){
    event.stopPropagation();
    console.log('Zoom')
    this.router.navigate(['/test']);
  }
  
}
