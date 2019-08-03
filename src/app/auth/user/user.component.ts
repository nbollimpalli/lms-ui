import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  passwordResetForm : FormGroup;
  settingsForm : FormGroup;
  matcher = new AlgoErrorStateMatcher();
  subscribe = true;
  permissions = {};
  constructor(
    public userService : UserService, 
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private restService: RestService,
  ) { }

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
    this.resetForm();
    this.initForms();
    this.userService.successEmitter.subscribe(
      (data) => {
        var code = data['code'];
        if(code == 'login')
        {
          this.resetForm();
        }
      }
    );
  }

  initForms()
  {
    this.passwordResetForm = this.formBuilder.group({
      existing_password: new FormControl('', {validators: [Validators.required]} ),
      new_password: new FormControl('', {validators: [Validators.required]} ),
    });

    
  }

  resetForm()
  {
    var user = this.userService.user;
    this.userForm  =  this.formBuilder.group({
      name: new FormControl(user.Name, {validators: []}),
      email: new FormControl(user.Email, {validators: []}),
      existing_password: new FormControl('', {validators: [Validators.required]} )
    });
    if(this.userService.user.SuperUser)
    {
      this.permissions = [ {'name' : 'You Can Do Everything In this app'} ];
    }
    else
    {
      this.permissions = this.userService.user.PermissionsList;
    }
    this.settingsForm = this.formBuilder.group({
      existing_password: new FormControl('', {validators: [Validators.required]} ),
      subscribe_newsletter: new FormControl(user.Subscribe, {validators: []} ),
      subscribe_transactions: new FormControl(user.SubscribeTransactions, {validators: []} ),
    });
  }

  get formControls() { return this.userForm.controls; }

  onSubmit(form)
  {
    if(form.invalid)
    {
      return;
    }
    else
    {
      this.updateUser(form.value);
    }
  }

  updateUser(data)
  {
    console.log('update profile ********');
    console.log(data);
    if(this.userForm.valid)
    {
      this.restService.post('UPDATE_PROFILE', null, null, data).subscribe(
        (data) =>
        {
          this.snackbarService.afterRequest(data);
        },
        (data) =>
        {
          this.snackbarService.afterRequestFailure(data);
        },
      );
    }
  }
}
