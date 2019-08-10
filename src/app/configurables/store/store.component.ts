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
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})

export class StoreComponent implements OnInit {
  storeForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  id;
  addresses = [];
  org_id;
  store = {
    'name' : '',
    'type' : 'public',
    'telephone' : '',
    'otype' : 'pickup_delivery'
  }
  actionLabel = 'CREATE STORE';
  typeList: SelectInterface[] = [
    {value: 'public', viewValue: 'PUBLIC'},
    {value: 'processing', viewValue: 'PROCESSING'},
    {value: 'satellite', viewValue: 'SATELLITE'},
    {value: 'partial_processing', viewValue: 'PARTIAL PROCESSING'}
  ];
  otypeList: SelectInterface[] = [
    {value: 'pickup_delivery', viewValue: 'PICKUP/DELIVERY'},
    {value: 'in_store', viewValue: 'IN STORE'}
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
      this.loadStore();
    });
  }

  ngOnInit() {
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

  loadAddresses()
  {
    if(this.id != null)
    {
      this.restService.get('S_ADDRESSES', null, {'id': this.id}).subscribe(
        (data) => {
          this.addresses = data['data'];
          console.log('****');
          console.log(data);
        }
      );
    }
  }

  resetForm()
  {
    if(this.id == null)
    {
      this.actionLabel = 'CREATE STORE';
    }
    else
    {
      this.actionLabel = 'UPDATE STORE';
    }
    this.storeForm  =  this.formBuilder.group({
      telephone: new FormControl(this.store['telephone'], {validators: []}),
      name: new FormControl(this.store['name'], {validators: []}),
      type: new FormControl(this.store['type'], {validators: []}),
      otype: new FormControl(this.store['otype'], {validators: []}),
      cash: new FormControl(true, {validators: []}),
      ewallet: new FormControl(true, {validators: []}),
      card: new FormControl(true, {validators: []}),
      chque: new FormControl(true, {validators: []}),
      dd: new FormControl(true, {validators: []}),
      imps: new FormControl(true, {validators: []}),
      neft: new FormControl(true, {validators: []}),
      rtgs: new FormControl(true, {validators: []}),
    });
  }

  get formControls() { return this.storeForm.controls; }

  onSubmit(form)
  {
    if(form.invalid)
    {
      return;
    }
    else
    {
      this.upsertStore();
    }
  }

  upsertStore()
  {
    console.log('update profile ********');
    if(this.storeForm.valid)
    {
      var data = this.storeForm.value;
      data['id'] = this.id;
      data['org'] = this.org_id;
      this.userService.loading = true;
      this.restService.post('UPSERT_STORE', null, null, data).subscribe(
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

  loadStore()
  {
    if(this.id != null)
    {
      this.userService.loading = true;
      this.restService.get('STORE', null, {'id' : this.id}).subscribe(
        (data) => {
          this.store = data['data'];
          this.resetForm();
          this.userService.loading = false;
          console.log(this.store);
        },
        (data) => {
          this.snackbarService.afterRequestFailure(data);
          this.userService.loading = false;
        }
      );
    }
  }
}