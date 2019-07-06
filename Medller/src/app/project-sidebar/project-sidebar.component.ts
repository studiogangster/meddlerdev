
import { Component, OnInit, Input,Inject } from '@angular/core';
import {SideMenuItem} from './../DataModels';
import {  Router, ActivatedRoute, RouterState} from '@angular/router';
import {DataFactoryService} from './../data-factory.service';
import {Location} from '@angular/common';
import {PentestApiService} from './../pentest/subdomain/search-pannel/pentest-api.service'
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.scss']
})
export class ProjectSidebarComponent implements OnInit {

  selectedItem = -1;
  highlightedItem = -1

  ngOnInit() {
    this.pentestApiService.UpdateProjects();
  }

  createProject(){
    this.selectedItem = -1;
    this.router.navigate(["create-project"])
  }

  goTo(index){

    
    this.onSelected( index )

    this.dataFactoryService.SetProject = this.pentestApiService.GetProjects[index].title

    this.router.navigate([     {outlets: {primary: 'search' ,sidebar: 'login'} } ])

   
      
  }


   getItems: Array<any> = [
    {
      title: "Create Project"
    }
   ];


   private elem;
   
  constructor(@Inject(DOCUMENT) private document: any, public  pentestApiService: PentestApiService, public router:Router,public route: ActivatedRoute,private _location: Location, public dataFactoryService: DataFactoryService ) {
    this.elem = document.documentElement;
  }

  openFullscreen() {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {

    if (document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  goBack(){
    this._location.back();
    // this.openFullscreen()
  }


  onEnter(index: number){
    this.highlightedItem = index;
  }


  onSelected(index: number){
    this.selectedItem = index;
    
    // if(!this.items[index].isLeaf)
    //       this.items = this.dataFactoryService.getDashboardMenu().getSideMenuItemsOf(0)
    //   else
    //       this.items = this.dataFactoryService.getDashboardMenu().getSideMenuItems()
        

  }

  onLeave(index: number){
    this.highlightedItem = -1
  }

}
