import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiFactoryService {

  readonly api_map : Map<string, string>;
  readonly rootUrl = environment.api;

  constructor() {
    this.api_map = new Map<string, string>();
    this.load_apis();
  }

  load_apis() {
    //auth services
    this.api_map.set('LOGIN_USER', '/auth/login/');
    this.api_map.set('SIGNUP_USER', '/auth/signup/');
    this.api_map.set('SOCIAL_SIGN_ON', '/auth/social-auth/');
    this.api_map.set('REQ_OTP', '/profile/otp');
    this.api_map.set('VERIFY_USER', '/profile/verify');
    this.api_map.set('IS_VALID_OTP', '/profile/valid-otp');
    this.api_map.set('RESET_PASSWORD', '/profile/reset-password/');
    this.api_map.set('FORGOT_RESET_PASSWORD', '/profile/forgot-password-reset');
    //current user services
    this.api_map.set('FETCH_PROFILE', '/profile/');
    this.api_map.set('UPDATE_PROFILE', '/profile/update');
    //user management
    this.api_map.set('GROUPS', '/profile/groups');
    this.api_map.set('CONTENT_TYPES', '/profile/content-types');
    this.api_map.set('PERMISSIONS', '/profile/permissions');
    this.api_map.set('UPDATE_PERMISSION', '/profile/permission/update');
    
    //file manager services
    this.api_map.set('UPLOAD_FILE', '/file/upload/');
    this.api_map.set('DELETE_FILE', '/file/delete/');

    //app category services
    this.api_map.set('UPSERT_APP_CAT', '/app/category/upsert/');
    this.api_map.set('DELETE_APP_CAT', '/app/delete/');
    this.api_map.set('GET_APP_CAT', '/app/category/');
    this.api_map.set('GET_APP_CATS', '/app/category/search/');

    //app services
    this.api_map.set('UPSERT_APP', '/app/upsert/');
    this.api_map.set('DELETE_APP', '/app/delete/');
    this.api_map.set('GET_APP', '/app/');
    this.api_map.set('GET_APPS', '/app/search/');

    //manage users apis
    this.api_map.set('GET_USERS', '/users/fetch-users/');
    this.api_map.set('UPDATE_MANAGE_USER', '/users/update-manage-user/');
    this.api_map.set('UPSERT_ROLE', '/ecore/upsert-role/');
    this.api_map.set('FETCH_USER_PROFILE', '/users/profile');

    this.api_map.set('SEARCH', '/ecore/search/');


  }

  getApi(api_name) : string
  {
    var api = this.api_map.get(api_name);
    if(api == null)
    {
      api = '';
    }
    else
    {
      api = this.rootUrl + this.api_map.get(api_name);
    }
    return api;
  }

}
