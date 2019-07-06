import { Component, OnInit } from '@angular/core';
import { FileUploader , FileUploaderOptions } from 'ng2-file-upload';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {

  files = []
  
  uploader  = new FileUploader( {url:URL} ) ;

  constructor() { }

  onFileSelected(files: FileList) {
  console.log("onFileSelected",files)

   for(let i=0;i< files.length;i++){
     this.files.push(files.item(i))
        console.log("File Uplaod " , files.item(i)) 
   }
}

  ngOnInit() {
    
  }

}
