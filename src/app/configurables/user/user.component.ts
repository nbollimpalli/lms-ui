import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { DialogService } from 'src/app/shared/services/dialog.service';

export interface SelectInterface {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  org_id;
  base_url = '/user/'
  userForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  subscribe = true;
  permissions = {};
  id;
  user : User = new User();
  actionLabel = 'CREATE USER';
  addresses = [];
  statusList: SelectInterface[] = [
    {value: 'pending', viewValue: 'PENDING'},
    {value: 'active', viewValue: 'ACTIVE'},
    {value: 'inactive', viewValue: 'INACTIVE'},
    {value: 'blocked', viewValue: 'BLOCKED'}
  ];
  groups = [];
  constructor(
    public userService : UserService, 
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private restService: RestService,
    private route : ActivatedRoute,
    private dialogService : DialogService,
  ) 
  { 
    this.route.params.subscribe( params => {
      this.id = params['id']
      this.org_id = params['org_id'];
      this.loadUser();
    });
  }

  ngOnInit() {
    this.loadGroups();
    this.resetForm();
    this.loadAddresses();
    this.userService.successEmitter.subscribe(
      (data) => {
        var code = data['code'];
        if(code == 'address')
        {
          this.loadAddresses();
        }
      }
    );
  }

  resetForm()
  {
    if(this.user.LoggedIn)
    {
      this.actionLabel = 'UPDATE USER';
    }
    else
    {
      this.actionLabel = 'CREATE USER';
    }
    this.userForm  =  this.formBuilder.group({
      mobile: new FormControl(this.user.Mobile, {validators: []}),
      name: new FormControl(this.user.Name, {validators: []}),
      email: new FormControl(this.user.Email, {validators: []}),
      status: new FormControl(this.user.Status, {validators: []}),
      is_staff : new FormControl(true, {validators: []}),
      group : new FormControl((this.user.Group == null ? null : this.user.Group['id']), {validators: []}),
      subscribe_newsletter : new FormControl(this.user.Subscribe, {validators: []}),
      subscribe_transactions : new FormControl(this.user.SubscribeTransactions, {validators: []}),
      reset_password : new FormControl(false, {validators: []}),
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
      this.upsertUser();
    }
  }

  upsertUser()
  {
    console.log('update profile ********');
    if(this.userForm.valid)
    {
      var data = this.userForm.value;
      data['id'] = this.id;
      if(this.org_id != null)
      {
        data['org'] = this.org_id;
      }
      this.userService.loading = true;
      this.restService.post('UPSERT_USER', null, null, data).subscribe(
        (data) =>
        {
          this.snackbarService.afterRequest(data);
          this.id = data['data']['id'];
          this.userService.loading = false;
        },
        (data) =>
        {
          this.snackbarService.afterRequestFailure(data);
          this.userService.loading = false;
        },
      );
    }
  }

  loadUser()
  {
    if(this.id != null)
    {
      this.userService.loading = true;
      this.restService.get('USER', null, {'user_id' : this.id}).subscribe(
        (data) => {
          this.user.setupLoggedInUser(data['data']);
          this.userService.loading = false;
          this.resetForm();
          console.log(this.user);
        },
        (data) => {
          this.snackbarService.afterRequestFailure(data);
          this.userService.loading = false;
        }
      );
    }
  }

  loadGroups() {
    this.restService.get('GROUPS', null, null).subscribe(
      (data) => {
        this.groups = data['data'];
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
      }
    );
  }

  loadAddresses()
  {
    if(this.id != null)
    {
      this.restService.get('U_ADDRESSES', null, {'user_id': this.id}).subscribe(
        (data) => {
          this.addresses = data['data'];
          console.log('****');
          console.log(data);
        }
      );
    }
  }
}
