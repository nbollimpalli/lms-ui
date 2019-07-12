import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { RestService } from './rest.service';
import { FirebaseService } from './firebase.service';

@Injectable()
export class UserService {
  user : User;
  role : string;
  public fuser;
  public loggedin = false;

  constructor(private restService : RestService, private firebaseService : FirebaseService) {
    this.user = new User();
    var token = localStorage.getItem('token');
    console.log('loggedin user token');
    console.log(token);
    if(token != null)
    {
      this.firebaseService.getUser(token).subscribe(
        (data) => {
          this.loggedin = true;
          this.fuser = data.payload;
        }
      )
    }
    
  }

  isLoggedIn()
  {
    return this.user.LoggedIn;
  }

  loadUser(data)
  {
    return true;
  }

  setUserState(userState: String)
  {
    this.user.UserState = userState;
  }

  getUserState()
  {
    return this.user.UserState;
  }

  registerUser()
  {
    const body = null;//= this.user.export_register_info();
    return this.restService.post( 'REGISTER_USER', null, null, body );
  }

  loginUser(loginData)
  {
    const body = { payload:
      {
        email: loginData['email'],
        password: loginData['pwd']
      }
    };
    return this.restService.post( 'LOGIN_USER', null, null, body );
  }

  afterLogin(token)
  {
    localStorage.setItem('userToken', token);
  }

  logout()
  {
    localStorage.removeItem('token');
    this.loggedin = false;
    this.fuser = null;
  }

  updateBasicInfo(data)
  {
    if(data)
    {
      this.user.Email = data['email'];
      this.user.Name = data['name'];
      this.user.Mobile = data['mobile'];
      this.user.SendToMailId = data['email'];
      this.user.SendToMobile = data['mobile'];
    }
  }

  updateProfile()
  {
    this.user.ProfileUpdationPending = true;
    this.fetchProfile().subscribe(
      (sdata) => {
        //this.user.import(sdata['data']['user']);
      },
      (fdata) => {

      },
      () => {
        this.user.ProfileUpdationPending = false;
      }
    );
  }

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
}
