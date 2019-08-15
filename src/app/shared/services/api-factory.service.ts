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
    this.api_map.set('LOGIN_USER', '/auth/login');
    this.api_map.set('SIGNUP_USER', '/auth/signup');
    this.api_map.set('SOCIAL_SIGN_ON', '/auth/social-auth');
    this.api_map.set('REQ_OTP', '/auth/otp');
    this.api_map.set('VERIFY_USER', '/auth/verify');
    this.api_map.set('IS_VALID_OTP', '/auth/valid-otp');
    this.api_map.set('RESET_PASSWORD', '/auth/reset-password/');
    this.api_map.set('FORGOT_RESET_PASSWORD', '/auth/forgot-password-reset');

    //current user services
    this.api_map.set('FETCH_PROFILE', '/profile/fetch');
    this.api_map.set('UPDATE_PROFILE', '/profile/update');
    this.api_map.set('ADDRESSES', '/profile/addresses');
    this.api_map.set('ADDRESS', '/profile/address');
    this.api_map.set('UPSERT_ADDRESS', '/profile/address/upsert');
    
    //store management
    this.api_map.set('STORES', '/stores/search');
    this.api_map.set('STORE', '/stores/fetch');
    this.api_map.set('UPSERT_STORE', '/stores/upsert');
    this.api_map.set('S_ADDRESSES', '/stores/addresses');
    this.api_map.set('S_ADDRESS', '/stores/address');
    this.api_map.set('S_UPSERT_ADDRESS', '/stores/address/upsert');

    this.api_map.set('PRICES', '/pricebooks/price/search');
    this.api_map.set('PRICE', '/pricebooks/price/fetch');
    this.api_map.set('UPSERT_PRICE', '/pricebooks/price/upsert');

    this.api_map.set('PRICEBOOKS', '/pricebooks/search');
    this.api_map.set('PRICEBOOK', '/pricebooks/fetch');
    this.api_map.set('UPSERT_PRICEBOOK', '/pricebooks/upsert');

    this.api_map.set('FABRICS', '/stores/fabric/search');
    this.api_map.set('FABRIC', '/stores/fabric/fetch');
    this.api_map.set('UPSERT_FABRIC', '/stores/fabric/upsert');

    this.api_map.set('CLOTHINGS', '/stores/clothing/search');
    this.api_map.set('CLOTHING', '/stores/clothing/fetch');
    this.api_map.set('UPSERT_CLOTHING', '/stores/clothing/upsert');

    this.api_map.set('SERVICES', '/stores/service/search');
    this.api_map.set('SERVICE', '/stores/service/fetch');
    this.api_map.set('UPSERT_SERVICE', '/stores/service/upsert');

    this.api_map.set('SPS', '/stores/serviceprice/search');
    this.api_map.set('SP', '/stores/serviceprice/fetch');
    this.api_map.set('UPSERT_SP', '/stores/serviceprice/upsert');

    this.api_map.set('ADDONS', '/stores/addon/search');
    this.api_map.set('ADDON', '/stores/addon/fetch');
    this.api_map.set('UPSERT_ADDON', '/stores/addon/upsert');

    this.api_map.set('DAMAGES', '/stores/damage/search');
    this.api_map.set('DAMAGE', '/stores/damage/fetch');
    this.api_map.set('UPSERT_DAMAGE', '/stores/damage/upsert');

    this.api_map.set('FABRIC_SERVICES', '/stores/fabric/services/search');
    this.api_map.set('FABRIC_SERVICES_UPSERT', '/stores/fabric/services/upsert');

    this.api_map.set('FABRIC_SERVICE_ADDONS', '/stores/fabric/service/addons/search');
    this.api_map.set('FABRIC_SERVICE_ADDONS_UPSERT', '/stores/fabric/service/addons/upsert');

    this.api_map.set('ORGS', '/orgs/search');
    this.api_map.set('ORG', '/orgs/fetch');
    this.api_map.set('UPSERT_ORG', '/orgs/upsert');
    this.api_map.set('O_ADDRESSES', '/orgs/addresses');
    this.api_map.set('O_ADDRESS', '/orgs/address');
    this.api_map.set('O_UPSERT_ADDRESS', '/orgs/address/upsert');

    //user management
    this.api_map.set('GROUPS', '/management/groups');
    this.api_map.set('CREATE_GROUP', '/management/group/create');
    this.api_map.set('CONTENT_TYPES', '/management/content-types');
    this.api_map.set('PERMISSIONS', '/management/permissions');
    this.api_map.set('UPDATE_PERMISSION', '/management/permission/update');
    this.api_map.set('USERS', '/management/users');
    this.api_map.set('USER', '/management/user');
    this.api_map.set('UPSERT_USER', '/management/user/upsert');
    this.api_map.set('U_ADDRESSES', '/management/addresses');
    this.api_map.set('U_ADDRESS', '/management/address');
    this.api_map.set('U_UPSERT_ADDRESS', '/management/address/upsert');
    this.api_map.set('U_UPDATE_STORES', '/management/user/stores/update');
    
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

    //complete search apis
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
