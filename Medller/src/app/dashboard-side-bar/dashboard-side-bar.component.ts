import { Component, OnInit, Input } from '@angular/core';
import {SideMenuItem} from './../DataModels';
import {  Router, ActivatedRoute, RouterState} from '@angular/router';
import {DataFactoryService} from './../data-factory.service';
import {Location} from '@angular/common';
import {ComponentStatus} from './../pentest/subdomain/search-pannel/pentest-api.service'
import {PentestApiService} from "../pentest/subdomain/search-pannel/pentest-api.service"
import { from } from 'rxjs';
@Component({
  selector: 'app-dashboard-side-bar',
  templateUrl: './dashboard-side-bar.component.html',
  styleUrls: ['./dashboard-side-bar.component.scss']
})
export class DashboardSideBarComponent implements OnInit {

@Input('navBarShow') navBarShow ;

  tmpItems = [
    {
    title: "title 1",
    subtitle:  "subtitle 1",
    desc: "desc",
    url: "url 1",
    icon: "icon 1"
    }
  ]
  
  selectedItem = -1;
  highlightedItem = -1

  ComponentStatus = ComponentStatus
  componentStatus:  ComponentStatus = ComponentStatus.LOADED


  get getItems(): Array<any> {
    // console.log("getItems", this.dataFactoryService.getDashboardMenu().getSideMenuItems)


    // return this.tmpItems;
    return this.dataFactoryService.getDashboardMenu().getSideMenuItems
  }

  constructor(public  dataFactoryService: DataFactoryService, private pentestApiService : PentestApiService, private router:Router,private route: ActivatedRoute,private _location: Location) {
  

 
  }

  goBack(){
    this._location.back();
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

  ngOnInit() {
    console.log('subscribed', this.route)
    // const parentRouteId = state.parent(route).params['id'];
//  this.getMenuItems()




this.route.params.subscribe(url =>{

// if( url.id  ){
//       this.onSelected(  parseInt( url.id || -1 ) )
//   } else{
//     this.onSelected( -1 )
//   }
    
});

 
 
  }

  getMenuItems(){
    // this.componentStatus = ComponentStatus.LOADING
    // setTimeout( ()=>{
    //   this.items = this.dataFactoryService.getDashboardMenu().getSideMenuItems;
    //   this.componentStatus = ComponentStatus.LOADED
    // }  , 0)
  }

  goTo(index){
    let item = this.getItems[index]

    this.onSelected( index )

    
    
    if(item){
            if(item.ifLeaf)
               this.router.navigate(item.getRoute)
              else{
                this.selectedItem = -1;
                this.dataFactoryService.updateMenu()
              }
    }
    
  }

  trackElement(index: number, element: any) {

  
    return element.subtitle ;
  }


  navBarClicked(){
    // console.log("navBarClicked")
    this.pentestApiService.navbarSubject.next(true);
  }
}
