import { Component, OnInit, ViewChild } from '@angular/core';
import { Timeline, Network, DataSet,TimelineItem,  Node, Edge, IdType, TimelineOptions } from 'vis';
import { DataSetService } from './../DataSet/data-set.service';
import { NetworkCallsService } from '../network-calls.service';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  name: String = '';
  hint: String = 'Action Name';
  timeNodes: DataSet<TimelineItem> = new DataSet([]);

  @ViewChild('timeline', { static: true }) timeline;

  constructor(private networkService: NetworkCallsService) {
    
    // this.getTimelineActions('4f657e43-4157-4732-ad20-9648323f9f0c');
    // setInterval(() => {
      // this.getTimelineActions('4f657e43-4157-4732-ad20-9648323f9f0c');
    // }, 5000);

  }

  stopSelectedActions() {
    this.networkService.stopSelectedActions();
  }
  searchSelectedActions() {

  }

  createAction() {

    if (this.name.length <= 0) {
      this.hint = "Action name can not be empty!"
      return;
    }

    this.networkService.createAction(this.name).subscribe();
    this.name = ''
    this.hint = "Enter action name"
    
  }


  getProjects(term: string) {
    this.networkService.getProjectLists(term).subscribe(data => {
    });
  }

  getTimelineActions(projectId: String) {

    this.networkService.getTimelineAction(projectId).subscribe(data => {
      const ActionTimelines = data.TIMELINES.map(action => {
        const start = Number(Number(action.startingTime).toFixed());
        let end = 253402194600000;
        if (Number(Number(action.endingTime).toFixed()) !== -1) {
          end = Number(Number(action.endingTime).toFixed());
        }
        // console.log('start', start, 'end', end);
        return {
          id: action.getActionId,
          start: start,
          end: end,  // end is optional
          content: action.getActionName
        };
      });

      ActionTimelines.map(action => {
        this.timeNodes.update(action as TimelineItem);
      });
      // this.timeNodes = new DataSet(ActionTimelines);
    });
  }

  ngOnInit() {


    // Configuration for the Timeline
    let options: TimelineOptions = {
  

      zoomMax: 36000,
      zoomMin: 10000,
      showCurrentTime: true,
      start: new Date(2011, 7, 15).getTime(),
      end: new Date(2020, 8, 2).getTime(),

      // start:"2017-02-06 11:00:00",end:"2019-02-08 11:30:00" ,
      verticalScroll: true,
      zoomKey: 'ctrlKey',
      maxHeight: '160px',
      height: '160px',
      zoomable: false,
      
    
      timeAxis: {
        scale: 'second',
        step: 1
      }
,rollingMode: {
      follow: true,
      offset: 0.5
    }
    };
    // options = {
    //   start: new Date(),
    //   end: new Date(new Date().getTime() + 1000000),
    //   rollingMode: {
    //     follow: true,
    //     offset: 0.5
    //   }
    // };
      const timeline = new Timeline(this.timeline.nativeElement, this.timeNodes, options);
    


    // timeline.on('select', (items) => {
    //   console.log(items, 'items');
    //   this.networkService.setTimelineSelectedItems(items.items);
    // });
    // // timeline.toggleRollingMode();
    // // this.addTimline();
    // setTimeout(() => {
    //   this.networkService.selectedTimelineItems.subscribe(data => {
    //     console.log('changed', data);
    //   });
    // }, 1000);

    setTimeout( ()=>{
      this.timeline.toggleRollingMode()
    }  , 4000)

  }

  addTimline() {

    setTimeout(() => {
      this.timeNodes.update({
        id: '2223',
        start: new Date().getTime(),
        end: new Date().getTime() + 100000000,  // end is optional
        content: 'Trajectory BB'
        // Optional: fields 'id', 'type', 'group', 'className', 'style'
      });

      console.log('hello');
    }, 1000);
  }

}
