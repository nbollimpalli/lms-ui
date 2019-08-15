import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/shared/services/rest.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-store',
  templateUrl: './user-store.component.html',
  styleUrls: ['./user-store.component.css']
})
export class UserStoreComponent implements OnInit {
  @Input() org_id : String;
  @Input() user : User;
  dataSource : [];
  constructor(private restService : RestService, private userService : UserService, private snackbarService : SnackbarService) { }

  ngOnInit() {
  }

  updateUserStore(store)
  {
     store['assigned'] = store['assigned'] == true ? false : true
    console.log();
    var body = {
      'user_id' : this.user.Id,
      'stores' : [store['id']],
      'assigned' : store['assigned']
    }
    this.restService.post('U_UPDATE_STORES', null, null, body).subscribe(
      (data) => {
        console.log('*******stores*****');
        this.snackbarService.afterRequest(data);
        this.userService.loading = false;
      },
      (data) => {
        this.userService.loading = false;
        this.snackbarService.afterRequest(data);
      }
    );
  }
}
