import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import { FirebaseService } from '../../shared/services/firebase.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  agreeTermsAndConditions = true;
  subscribe = true;

  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<SignupComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Object
            )
  {
    
  }

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

  ngOnInit() {
    this.signupForm  =  this.formBuilder.group({
      mobile: new FormControl('', {validators: [Validators.required]}),
      // name: new FormControl('', {validators: []}),
      email: new FormControl('', {validators: []}),
       password: new FormControl('', {validators: [Validators.required]} ),
      cpwd: new FormControl('', {validators: [Validators.required]} ),
      agreed: new FormControl(true, {validators: [Validators.required]} ),
      subscribe_newsletter: new FormControl(true, {validators: []} )
    });
  }

  get formControls() { return this.signupForm.controls; }

  onSubmit()
  {
    if(this.signupForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.signupUser(this.signupForm.value);
    }
  }

}
