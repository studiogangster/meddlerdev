import { Injectable } from '@angular/core';
import {SideMenuItem } from './DataModels';
class DasboardMenu {

  sideMenuItems: SideMenuItem[] = [];
  sideSubmenuItems: SideMenuItem[] = [];

  setSideMenuItems(sideMenuItems: SideMenuItem[]) {
    this.sideMenuItems = sideMenuItems;
  }

  get getSideMenuItems(): SideMenuItem[] {
    
    return this.sideMenuItems ;
  }

  setSideMenuItemsOf(sideMenuItems: SideMenuItem[]) {
    this.sideSubmenuItems = sideMenuItems;
  }

  getSideMenuItemsOf(index: number): SideMenuItem[] {
    return this.sideSubmenuItems ;
  }

  addSideMenuItems(sideMenuItem: SideMenuItem) {
    this.sideMenuItems.push(sideMenuItem);
  }

}

class DummyDataFactory {

  getMenuItems(): SideMenuItem[] {

    console.log("getMenuItems")
    const sideMenuItem: SideMenuItem[] = [];
    for (let i = 0 ; i < 10; i++) {
      // sideMenuItem.push( new SideMenuItem('title' + (i + 1), 'subtitle' + (i + 1) , 'desc' + (i + 1) , '' , '') );
    }
    // sideMenuItem.push( new SideMenuItem('Login' , 'Login' , ''  , '' , '').IsLeaf(true).setRoute(  [{ outlets: { primary: ['login'],sidebar: ['login'] } }] ) );
    sideMenuItem.push( new SideMenuItem('Rcon' , 'Rcon' , ''  , '' , '').IsLeaf(true).setRoute([{ outlets: { primary: ['search'],sidebar: ['login' ] } }] ) );
    sideMenuItem.push( new SideMenuItem('Business' , 'Business' , ''  , '' , '').IsLeaf(true).setRoute([{ outlets: { primary: ['search'],sidebar: ['login' ] } }] ) );
    sideMenuItem.push( new SideMenuItem('History' , 'History' , ''  , '' , '').IsLeaf(true).setRoute([{ outlets: { primary: ['rconhistory'],sidebar: ['login' ] } }] ) );
    

    sideMenuItem.push( new SideMenuItem('Pro (Beta)' , 'Pro' , ''  , '' , '').IsLeaf(true).setRoute([{ outlets: { primary: ['pricing'],sidebar: ['login'] } }] ) );
    // sideMenuItem.push( new SideMenuItem('Projects' , 'Projects' , ''  , '' , '').IsLeaf(true).setRoute( [{ outlets: { primary: ['products'],sidebar: ['project'] } }] ) );
    sideMenuItem.push( new SideMenuItem('Tools' , 'Tools' , ''  , '' , '').IsLeaf(true).setRoute( [{ outlets: { primary: ['tools'],sidebar: ['login'] } }]  ) );
    sideMenuItem.push( new SideMenuItem('Blog' , 'Blog' , ''  , '' , '').IsLeaf(true).setRoute(  [{ outlets: { primary: ['blog'],sidebar: ['login'] } }]  ) );
    sideMenuItem.push( new SideMenuItem('Pricing' , 'Pricing' , ''  , '' , '').IsLeaf(true).setRoute( [{ outlets: { primary: ['consult'],sidebar: ['login'] } }]  ) );
    sideMenuItem.push( new SideMenuItem('FAQ' , 'FAQ' , ''  , '' , '').IsLeaf(true).setRoute( [{ outlets: { primary: ['faq'],sidebar: ['login'] } }]  ) );
    sideMenuItem.push( new SideMenuItem('Contact Us' , 'Contact' , ''  , '' , '').IsLeaf(true).setRoute( [{ outlets: { primary: ['contact'],sidebar: ['login'] } }]  ) );
   
    return sideMenuItem;
  }

  getSubmenuItems(): SideMenuItem[] {
    const sideMenuItem: SideMenuItem[] = [];
    for (let i = 0 ; i < 10; i++) {
      // sideMenuItem.push( new SideMenuItem('title' + (i + 1), 'subtitle' + (i + 1) , 'desc' + (i + 1) , '' , '') );
    }
    sideMenuItem.push( new SideMenuItem('Create' , 'Create' , ''  , '' , '').IsLeaf(true).setRoute(  [{ outlets: { primary: ['create-project'],sidebar: ['login'] } }] ) );
    sideMenuItem.push( new SideMenuItem('PROJECT I' , 'PROJECT1' , ''  , '' , '').IsLeaf(true).setRoute([{ outlets: { primary: ['search'],sidebar: ['login' ] } }] ) );
    sideMenuItem.push( new SideMenuItem('PROJECT II' , 'PROJECT2' , ''  , '' , '').IsLeaf(true).setRoute([{ outlets: { primary: ['pricing'],sidebar: ['login'] } }] ) );

   
    return sideMenuItem;
  }
  

}

class Project{
  name = "TIL"
}

@Injectable()
export class DataFactoryService {

  dummyDataFactory: DummyDataFactory = new DummyDataFactory();

  dasboardMenu: DasboardMenu  = new DasboardMenu();




   currentProject = ""

   public get GetProject() : string{
    return this.currentProject;
  }

  public set SetProject(_currentProject ) {
     this.currentProject = _currentProject;
  }

  constructor() {
    this.dasboardMenu.setSideMenuItems( this.dummyDataFactory.getMenuItems() );
    this.dasboardMenu.setSideMenuItemsOf( this.dummyDataFactory.getSubmenuItems() );



   }
   getDashboardMenu(): DasboardMenu {
     return this.dasboardMenu;
   }

   updateMenu(){
    console.log("CHANGE MENU")
    this.dasboardMenu.setSideMenuItems(  this.dasboardMenu.getSideMenuItemsOf(0) )
   }
}
