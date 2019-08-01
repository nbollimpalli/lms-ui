import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { ApiFactoryService } from './api-factory.service';

@Injectable()
export class RestService {

  constructor(private http : HttpClient, private apiFactory : ApiFactoryService) { }

  get(api_name : string, headers, params)
  {
    var get_headers = new HttpHeaders(this.fetchHeaders());
    console.log('get headers');
    console.log(get_headers);
    return this.http.get(this.apiFactory.getApi(api_name),{params: params, headers: get_headers});
  }

  post(api_name : string, headers, params, body)
  {
    var post_headers = new HttpHeaders(this.fetchHeaders());
    return this.http.post(this.apiFactory.getApi(api_name), body,{params: params, headers: post_headers});
  }

  fetchHeaders()
  {
    var headers = {
      'Content-Type' : 'application/json',
    }
    var token = localStorage.getItem('userToken');
    if(token != null)
    {
      headers['Authorization'] = 'Bearer ' + token;
    }
    console.log(headers);
    return headers;
  }


}
