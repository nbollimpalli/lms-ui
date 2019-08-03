import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { RestService } from './rest.service';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { SnackbarService } from './snackbar.service';

@Injectable()
export class UserService {
  user : User;
  role : string;
  public fuser;
  public loggedin = false;
  public loading = false;
  public isConnected = true;
  successEmitter = new EventEmitter<Object>();
  errorEmitter = new EventEmitter<Object>();
  notifications = [];

  constructor(
              private restService : RestService, 
              private router : Router, 
              private connectionService: ConnectionService, 
              private snackbar : SnackbarService,
            ) {
    this.monitorConnectivity();
    this.loading = true;
    this.user = new User();
    var token = localStorage.getItem('userToken');
    console.log('loggedin user token');
    console.log(token);
    this.updateGuestUser();
    if(token != null)
    {
      this.updateLoggedInUser(true);
    }
    else
    {
      this.loading = false;
    }
  }

  requestOTP(mobile, type)
  {
    var params = {'mobile' : mobile, 'type' : type}
    this.restService.get('REQ_OTP', null, params).subscribe(
      (data) => {
        this.snackbar.afterRequest(data);
      },
      (data) => {
        this.snackbar.afterRequestFailure(data);
      }
    );
  }

  verify(otp)
  {
    var body = {'otp' : otp}
    this.restService.post('VERIFY_USER', null, null, body).subscribe(
      (data) => {
        this.snackbar.afterRequest(data);
        this.successEmitter.emit({'code' : 'verify', 'data' : data});
        this.notifications.length = 0;
      },
      (data) => {
        this.snackbar.afterRequestFailure(data);
      }
    );
  }

  updateLoggedInUser(refresh)
  {
    this.restService.get('FETCH_PROFILE', null, null).subscribe(
      (data) => {
        console.log('****');
        console.log(data);
        this.user.setupLoggedInUser(data['data']);
        var emi = {'code' : 'login', 'data' : data};
        if(this.user.Status == 'pending')
        {
          this.notifications.push({ 'name':'Verify your account','icon':'flash_on','action' : 'verifyAccount'});
          if(refresh == false)
          {
            emi['action'] = 'openDialog';
            emi['params'] = ['verify', {}];
          }
        }
        this.successEmitter.emit(emi);
        this.loading = false;
        if(refresh == false)
        {
          this.router.navigate([this.user.HomeUrl]);
        }
      },
      (data) => {
        this.loading = false;
        this.errorEmitter.emit({'code' : 'login', 'data' : data});
      }
    );
  }

  updateGuestUser()
  {
    this.user.setupGuestUser();
    this.successEmitter.emit({'code' : 'login', 'data' : true});
  }

  hasPermission(perm)
  {
    return (this.user.SuperUser || (this.user.Permissions[perm] == true) );
  }

  hasPermissions(perms)
  {
    if(this.user.SuperUser)
    {
      return true;
    }
    else
    {
      if(perms == null || perms.length <= 0)
      {
        return false;
      }
      else
      {
        var has_perm = true;
        perms.forEach(perm => {
           has_perm = has_perm && (this.user.Permissions[perm] == true);
           if(has_perm == false)
           {
             return false;
           }
        });
        return true;
      }
    }
  }

  signupUser(data)
  {
    console.log('signupdata');
    console.log(data);
    this.loading = true;
    this.restService.post( 'SIGNUP_USER', null, null, data ).subscribe(
      (data) => {
        console.log(data);
        this.successEmitter.emit({'code' : 'signup', 'data' : data});
        this.loading = false;
      },
      (data) => {
        this.snackbar.afterRequestFailure(data);
        this.loading = false;
        this.errorEmitter.emit({'code' : 'signup', 'data' : data});
        this.loading = false;
      }
    );
    return;
  }

  loginUser(loginData)
  {
    console.log('logindata');
    console.log(loginData);
    this.loading = true;
    this.restService.post( 'LOGIN_USER', null, null, loginData ).subscribe(
      (data) => {
        console.log(data);
        var token = data["data"]["token"];
        this.afterLogin(token);
        this.snackbar.afterRequest(data["data"]);
        this.updateLoggedInUser(false);
      },
      (data) => {
        this.snackbar.afterRequestFailure(data);
        this.loading = false;
      }
    );
    return;
  }

  afterLogin(token)
  {
    localStorage.setItem('userToken', token);
  }

  logout()
  {
    localStorage.removeItem('userToken');
    this.updateGuestUser();
    this.router.navigate([this.user.HomeUrl]);
  }

  updateBasicInfo(data)
  {
    if(data)
    {
      this.user.Email = data['email'];
      this.user.Name = data['name'];
      this.user.Mobile = data['mobile'];

    }
  }

  updateProfile()
  {}

  fetchProfile()
  {
    var params = {};
    return this.restService.get('FETCH_USER_PROFILE', null, params);
  }

  social_auth_login(data)
  {
    return this.restService.post('SOCIAL_SIGN_ON', null, null, data);
  }

  sendForgotPasswordOTP(email : String)
  {
    const body = { 'email' : email };
    return this.restService.post('SEND_OTP', null, null, body);
  }

  verify_otp(email : String, otp : String)
  {
    const body = { 'email' : email, 'otp' : otp }
    return this.restService.post('VERIFY_OTP', null, null, body);
  }

  reset_password(token : String, password : String)
  {
    const body = { 'token' : token, 'password' : password}
    return this.restService.post('RESET_PASSWORD', null, null, body);
  }

  getHomeUrl()
  {
    return this.user.HomeUrl;
  }

  monitorConnectivity()
  {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    })
  }

  updateUser(data)
  {
    
  }
}
