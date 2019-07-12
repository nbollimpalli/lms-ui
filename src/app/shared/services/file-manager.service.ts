import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class FileManagerService {

  constructor(private restService : RestService) { }

  upload(fileToUpload: File, options) {
    const formData: FormData = new FormData();

      formData.append('upload', fileToUpload, fileToUpload.name);
      if (options) {
        for(let key in options){
          formData.append(key, options[key])
        }
      }
    return this.restService.post( 'UPLOAD_FILE', null, null, formData );
  }

  delete_file(key: string) {

  }

}
