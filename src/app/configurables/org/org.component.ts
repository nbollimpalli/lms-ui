import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog.service';

export interface SelectInterface {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {
  storeForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  id;
  addresses = [];
  store = {
    'name' : '',
    'telephone' : ''
  }
  actionLabel = 'CREATE ORG';
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
      this.restService.get('O_ADDRESSES', null, {'id': this.id}).subscribe(
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
      this.actionLabel = 'CREATE ORG';
    }
    else
    {
      this.actionLabel = 'UPDATE ORG';
    }
    this.storeForm  =  this.formBuilder.group({
      telephone: new FormControl(this.store['telephone'], {validators: []}),
      name: new FormControl(this.store['name'], {validators: []}),
      // status: new FormControl('active', {validators: []})
    });
    if(!this.userService.hasPermission('modify_org'))
    {
      this.storeForm.disable();
    }
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
      this.userService.loading = true;
      this.restService.post('UPSERT_ORG', null, null, data).subscribe(
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
      this.restService.get('ORG', null, {'id' : this.id}).subscribe(
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
