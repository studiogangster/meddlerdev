import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil, tap } from 'rxjs/operators'
import {URL} from './EnviromentConfig';


class Action {
  constructor(private ActionId: String, private ActionName: String, private TOE: Number, private TOS: String, private status: String) {
  }

  get getActionId() {
    return this.ActionId;
  }

  get getActionName() {
    return this.ActionName;
  }

  get startingTime() {
    return this.TOS;
  }

  get endingTime() {
    return this.TOE;
  }
}

class Project {
  TIMELINES: Action[];

  constructor(private ProjectName: String, private Status: String,
    private _TIMELINES: Action[], private TOC: String, private TOE: String, private TOU: String, private id: String) {
    this.TIMELINES = this._TIMELINES.map(action => {
      return new Action(action['ActionId'], action['ActionName'], action['TOE'], action['TOS'], action['status']);
    });

  }


}

@Injectable()
export class NetworkCallsService {
  apiRoot = `http://${URL}:5000`;
  projectId = '4f657e43-4157-4732-ad20-9648323f9f0c';

  selectedTimelineItems: Observable<any> = Observable.from([]);


  createProjectIfNotExists() {
    this.getProjectLists('')
    .subscribe( res => {
      if (res.length === 0) {
        this.createProject('Dummy Project')
        .subscribe( res => {
          this.createProjectIfNotExists();
        });
      } else {
        this.projectId = String(res[0]['id']);
      }
    } );
  }

  createProject(projectname) {
    return this.http.get(this.apiRoot + '/projects/create/' + projectname)
    .map( (res:Response) => {
      const projectCreationStart = res.json();
      console.log(projectCreationStart);
    });
  }

  getProjectLists(term: string): Observable<Project[]> {
    console.log(`${this.apiRoot}/projects/enlist`);
    const apiURL = `${this.apiRoot}/projects/enlist`;
    return this.http.get(apiURL)
      .map( ( res: Response) => {
        return res.json().map(item => {
          console.log('map', item)
          return new Project(
            item.ProjectName,
            item.Status,
            item.TIMELINES || [],
            item.TOC,
            item.TOE,
            item.TOU,
            item.id,
          );
        });
      });
  }


  createAction(actionName: String): Observable<JSON> {
    const apiURL = `${this.apiRoot}/projects/action/create/${this.projectId}/${actionName}`;
    return this.http.get(apiURL)
      .map(res => {
        console.log('action', apiURL);
        return res.json();
      });
  }

  getTimelineAction(projectId: String): Observable<Project> {

    const apiURL = `${this.apiRoot}/projects/details/${projectId}`;
    return this.http.get(apiURL)
      .map(_item => {
        const item = _item.json();
        return new Project(
          item.ProjectName,
          item.Status,
          item.TIMELINES,
          item.TOC,
          item.TOE,
          item.TOU,
          item.id,
        );

      });
  }

  endTimelineAction(actionId: String): Observable<Project> {

    const apiURL = `${this.apiRoot}/projects/action/end/${this.projectId}/${actionId}`;
    return this.http.get(apiURL)
      .map(res => {
        return res.json();
      });
  }


  changeScreenSizeStream(width: number, height: number): Observable<any> {

    const apiURL = `${this.apiRoot}/device/startStream/${width}/${height}`;
    return this.http.get(apiURL)
      .map(res => {
        console.log('screen size change', apiURL);
        return res.json();
      });
  }

  setTimelineSelectedItems(data) {
    console.log('setTimelineSelectedItems');
    this.selectedTimelineItems = Observable.from([data]);
  }

  stopSelectedActions() {

    this.selectedTimelineItems.subscribe(item => {
      console.log('Deleting', item);
      this.endTimelineAction(item).subscribe(result => {
        console.log('Deleting done', result);
      });

    });
  }

  constructor(private http: Http) {
    this.createProjectIfNotExists();
  }

}
