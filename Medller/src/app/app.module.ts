import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataSetService } from './DataSet/data-set.service';
import { WebsocketService } from './DataSet/websocket.service';

import { DeviceEmulatorComponent } from './device-emulator/device-emulator.component';
// import { NetworkTrafficGraphComponent } from './network-traffic-graph/network-traffic-graph.component';
import { TimelineComponent } from './timeline/timeline.component';
import { HttpModule, Http } from '@angular/http';
import { NetworkCallsService } from './network-calls.service';
import { ListComponent } from './MicroComponents/list/list.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TimelineControllerComponent } from './MicroComponents/timeline-controller/timeline-controller.component';
import { TrafficInspectorComponent } from './traffic-inspector/traffic-inspector.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { TimeLineComboComponent } from './time-line-combo/time-line-combo.component';

import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { TrafficDataItemComponent } from './MicroComponents/traffic-data-item/traffic-data-item.component';
import { TextFieldComponent } from './MicroComponents/text-field/text-field.component';
import  '../environments/environment'
import   '../environments/environment.prod'

import { IntroComponent } from './MicroComponents/intro/intro.component';
import { ProjectSetupComponent } from './project-setup/project-setup.component';

import { SideMenuItem } from './DataModels';
import { DataFactoryService } from './data-factory.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { TestComponent } from './NewsRoomController/test/test.component';
import { ObsServiceService } from './NewsRoomController/obs-service.service';
import { ScenesComponent } from './NewsRoomController/scenes/scenes.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CodeHighlighterComponent } from './code-highlighter/code-highlighter.component';
// import { ProfileViewComponent } from './profile-view/profile-view.component';


const componentRoutes: Routes = [




  // { path: 'test', component: ProfileViewComponent },
  
  
  // { path: 'playground', component: NetworkTrafficGraphComponent },
  { path: 'timeline', component: TimeLineComboComponent },
  { path: 'device', component: DeviceEmulatorComponent },
  // { path: 'proxy', component: NetworkTrafficGraphComponent },


  // { path: '', component: SearchPannelComponent },

    


  
 

  // Aux Router Outlets

];

@NgModule({
  declarations: [
    DeviceEmulatorComponent,
    // NetworkTrafficGraphComponent,
    TimelineComponent,
    ListComponent,
    TimelineControllerComponent,
    TrafficInspectorComponent,
    TimeLineComboComponent,
    TrafficDataItemComponent,
    TextFieldComponent,
    IntroComponent,
    ProjectSetupComponent,

    // TestComponent,
    ScenesComponent,
    CodeHighlighterComponent,
    // ProfileViewComponent,


  ],
  imports: [
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      componentRoutes
    ),
    VirtualScrollModule
  ],
  providers: [   RouterModule,  ObsServiceService , NetworkCallsService, DataSetService, WebsocketService, DataFactoryService  ],
  bootstrap: [DeviceEmulatorComponent]
})
export class AppModule {
}
