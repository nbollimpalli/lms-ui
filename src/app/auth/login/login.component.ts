import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder, Form} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from 'src/app/shared/services/rest.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export interface LoginDialogData {
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  forgotPasswordForm : FormGroup;
  matcher = new AlgoErrorStateMatcher();
  social_logins = [
    'Facebook',
    'Google',
    'Twitter',
    'Linked-In'
  ]
  lmobile = new FormControl('', {validators: [Validators.required], updateOn: 'blur'});
  fmobile = new FormControl('', {validators: [Validators.required], updateOn: 'blur'});
  valid_otp = false;
  otp_requested = false;
  img_icon_data = {
    'Facebook' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-facebook.svg',
    'Twitter' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-twitter.svg',
    'Linked-In' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-linkedin.svg',
    'Google' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-google.svg'
  };
  title_logo = 'local_laundry_service';
  title = ['L','O','G','I','N'];
  constructor(
              public userService : UserService, 
              private formBuilder: FormBuilder,
              public loginDialogRef: MatDialogRef<LoginComponent>,
              private restService : RestService,
              private snackbarService : SnackbarService,
              @Inject(MAT_DIALOG_DATA) public data: LoginDialogData
              ) { 
  }

  onNoClick(): void {
    this.loginDialogRef.close();
  }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      mobile: this.lmobile,
      password: new FormControl('', {validators: [Validators.required]} )
    });

    this.forgotPasswordForm = this.formBuilder.group({
      mobile: this.fmobile,
      otp: new FormControl('', {validators: [Validators.required]} ),
      password: new FormControl('', {validators: [Validators.required]} )
    });
    console.log(this.loginForm);
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit()
  {
    if(this.loginForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.loginUser(this.loginForm.value);
    }
  }

  updateMobiles(mobile)
  {
    this.lmobile.setValue(mobile.value);
    this.fmobile.setValue(mobile.value);
  }

  validateOTP()
  {
    var body = this.forgotPasswordForm.value;
    this.restService.post('IS_VALID_OTP', null, null, body).subscribe(
      (data) => {
        this.valid_otp = true;
      },
      (data) => {
        
      }
    );
  }

  resetPassword()
  {
    if(this.forgotPasswordForm.valid)
    {
      var body = this.forgotPasswordForm.value;
      this.restService.post('FORGOT_RESET_PASSWORD', null, null, body).subscribe(
        (data) => {
          this.snackbarService.afterRequest(data);
          this.onNoClick();
        },
        (data) => {
          this.snackbarService.afterRequest(data);
        }
      );
    }
  }

  requestOTP()
  {
    this.otp_requested = true;
    this.valid_otp = false;
    this.userService.requestOTP(this.fmobile.value, 'reset_password')
  }

  clearValue(form, controlName)
  {
    form.controls[controlName]['value'] = '';
  }
}
