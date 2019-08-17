import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { RestService } from 'src/app/shared/services/rest.service';

@Component({
  selector: 'app-store-services',
  templateUrl: './store-services.component.html',
  styleUrls: ['./store-services.component.css']
})
export class StoreServicesComponent implements OnInit {
  @Input() storeId;
  services = [];
  constructor(private userService : UserService, private restService : RestService) { }

  ngOnInit() {
    this.loadServices()
  }

  loadServices()
  {
    this.userService.loading = true;
    var query_params = {'store_id':this.storeId};
    this.restService.get('STORE_SERVICES', null, query_params).subscribe(
      (data) => {
        this.services = data['data'];
        this.userService.loading = false;
      },
      (data) => {
        this.userService.loading = false;
      }
    );
  }

  updateServices(service_id, selected)
  {
    console.log(selected);
    this.userService.loading = true;
    var body = {'store_id':this.storeId ,'service_id':service_id, 'assigned':selected};
    this.restService.post('UPSERT_STORE_SERVICE', null, null, body).subscribe(
      (data) => {
        this.services = data['data'];
        this.userService.loading = false;
      },
      (data) => {
        this.userService.loading = false;
      }
    );
  }

}
