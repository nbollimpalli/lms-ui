import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface LoginDialogData {
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();

  social_logins = [
    'Facebook',
    'Google',
    'Twitter',
    'Linked-In'
  ]

  img_icon_data = {
    'Facebook' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-facebook.svg',
    'Twitter' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-twitter.svg',
    'Linked-In' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-linkedin.svg',
    'Google' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-google.svg'
  };
  constructor(
              public userService : UserService, 
              private formBuilder: FormBuilder,
              public loginDialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LoginDialogData
              ) { 
  }

  onNoClick(): void {
    this.loginDialogRef.close();
  }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      mobile: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
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
}
