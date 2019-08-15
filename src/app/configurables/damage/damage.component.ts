import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AlgoErrorStateMatcher } from '../../shared/utils/algo-error-state-matcher';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.css']
})
export class DamageComponent implements OnInit {

  damageForm: FormGroup;
  matcher = new AlgoErrorStateMatcher();
  id;
  title = ['R','E','S','E','R','V','A', 'T', 'I', 'O', 'N'];
  title_logo = 'texture';
  damage = {
    'name': ''
  }
  constructor(
                private userService : UserService, 
                private formBuilder: FormBuilder, 
                public loginDialogRef: MatDialogRef<DamageComponent>,
                private snackbarService: SnackbarService,
                private restService: RestService,
                @Inject(MAT_DIALOG_DATA) public data: Object
            )
  {
    console.log('****');
    console.log(data);
    this.id = data['id'];
  }

  ngOnInit() {
    this.setupDamage();
    this.loadDamage();
  }

  setupDamage()
  {
    this.damageForm  =  this.formBuilder.group({
      name: new FormControl(this.damage['name'], {validators: [Validators.required]})
    });
  }

  get formControls() { return this.damageForm.controls; }

  onSubmit()
  {
    if(this.damageForm.invalid)
    {
      return;
    }
    else
    {
      this.userService.loading = true;
      var body = this.damageForm.value;
      var destination = 'UPSERT_DAMAGE';
      if(this.id != null)
      {
        body['id'] = this.id;        
      }
      this.restService.post(destination, null, null, body).subscribe(
        (data) => {
          this.userService.loading = false;
          var emi = {'code' : 'damage', 'data' : {}};
          this.userService.successEmitter.emit(emi);
          this.snackbarService.afterRequest(data);
        },
        (data) => {
          this.userService.loading = false;
          this.snackbarService.afterRequestFailure(data);
        }
      );
    }
  }

  loadDamage()
  {
    if(this.id != null)
    {
      this.restService.get('DAMAGE', null, {'id' : this.id}).subscribe(
        (data) => {
          this.damage = data['data'];
          this.setupDamage();
        }
      );
    }
  }

}


