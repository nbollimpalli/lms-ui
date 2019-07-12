import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class SearchService {

constructor(private restService : RestService) { }
  search(queryString: string, type : string) {
      const body = {
        type : type,
        query : queryString,
        name : name
      }
      return this.restService.post( 'SEARCH', null, null, body );
  }
}
