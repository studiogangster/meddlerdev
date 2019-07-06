import { Component, OnInit, Input,  } from '@angular/core';
import { Router } from '@angular/router';
import {PentestApiService} from '../pentest/subdomain/search-pannel/pentest-api.service'
import { from } from 'rxjs';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  constructor(private pentestApiService:PentestApiService , private router: Router) { }

projectName  = ""

creating = false

  ngOnInit() {
  }
  

  createProject(){
    if(this.creating == true)
      return

    this.creating = true;
    console.log('projectName' , this.projectName)
      this.pentestApiService.createProject(this.projectName).subscribe( ()=>{
        this.pentestApiService.UpdateProjects()
        this.creating = false;
        this.router.navigate([     {outlets: {primary: 'search' ,sidebar: 'login'} } ])

      } )
  }

}
