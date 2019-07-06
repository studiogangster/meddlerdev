import { Component, OnInit } from '@angular/core';
import { NetworkCallsService } from './../network-calls.service';

@Component({
  selector: 'app-project-setup',
  templateUrl: './project-setup.component.html',
  styleUrls: ['./project-setup.component.scss']
})
export class ProjectSetupComponent implements OnInit {

  constructor(private networkCallsService:  NetworkCallsService) {
    networkCallsService.getProjectLists('Project Name')
    .subscribe();

  }

  ngOnInit() {
  }

}
