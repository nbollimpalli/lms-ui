import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import { FirebaseService } from '../../shared/services/firebase.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();

  constructor(private router : Router, private userService : UserService, private formBuilder: FormBuilder, private firebaseService : FirebaseService, private snackbarService : SnackbarService) { 
    this.userService.setUserState('any');
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
      name: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required]}),
      mobile: new FormControl('', {validators: [Validators.required]}),
      password: new FormControl('', {validators: [Validators.required]} ),
      cpwd: new FormControl('', {validators: [Validators.required]} ),
    });
  }

  get formControls() { return this.signupForm.controls; }

  ngOnDestroy() {
    this.userService.setUserState('any');
  }

  onSubmit()
  {
    if(this.signupForm.invalid)
    {
      return;
    }
    else
    {
      console.log(this.signupForm.value);
      this.firebaseService.createUser(this.signupForm.value)
      this.snackbarService.show_snackbar('user successfully created, please login');
      this.router.navigate(['/login']);
    }
  }

}
