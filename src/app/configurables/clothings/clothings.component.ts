import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators'; 
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-clothings',
  templateUrl: './clothings.component.html',
  styleUrls: ['./clothings.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ClothingsComponent implements OnInit, OnDestroy {
  // MatPaginator Inputs
  color = '#f3f3f3';
  current_page = 1;
  total_count = 10;
  length = 100;
  page_size = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  currentClothing;

  name = new FormControl();
  subscriptions : Subscription[] = [];
  
  clothings = [];
  fabrics = [];
  fabricServices = {'assigned' : [], 'unassigned' : []};
  fabricServiceAddons = {'assigned' : [], 'unassigned' : []};
  
  sclothing = null;
  sfabric = null;
  sfabricService = null;

  constructor(private dialogService : DialogService, private userService : UserService, private restService : RestService, private snackbarService : SnackbarService, private route: ActivatedRoute) { 
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setPagination(pageEvent)
  {
    console.log(pageEvent);
    this.current_page = pageEvent.pageIndex + 1;
    this.page_size = pageEvent.pageSize;
    this.loadClothings();
  }
  
  ngOnInit() {
    this.loadClothings()
    this.initFilters();
    this.userService.successEmitter.subscribe(
      (data) => {
        var code = data['code'];
        if(code == 'clothing')
        {
          this.loadClothings();
        }
        else if(code == 'fabric')
        {
          this.loadFabrics();
        }
        else if(code == 'service')
        {
          this.loadServices();
        }
        else if(code == 'addon')
        {
          this.loadAddons();
        }
      }
    );
  }

  initFilters()
  {
    this.unsubscribe();
    this.name = new FormControl();
    this.setDebouncers(this.name);
    this.loadClothings();
  }

  setDebouncers(frmctrl)
  {
    var sub = frmctrl.valueChanges
      .pipe(
        debounceTime(500), tap(data => { console.log(data) })
      )
      .subscribe((data) => {
        this.loadClothings();
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    this.subscriptions.forEach( element => {
      element.unsubscribe();
    } );
  }

  loadClothings()
  {
    var filters = [];
    (this.name.value == null || this.name.value.trim().length == 0) ? '' : filters.push('name__icontains-'+this.name.value);
    var filters_Str = filters.join(',');
    var query_params = { 'page' : this.current_page, 'count_per_page' : this.page_size}
    if(filters_Str != null && filters_Str.length != 0)
    {
      query_params['filters'] = filters_Str;
    }
    this.restService.get('CLOTHINGS', null, query_params).subscribe(
      (data) => {
        this.clothings = data['data']['clothings']
      },
      (data) => {
        this.snackbarService.afterRequest(data);
      }
    );
  }

  loadFabrics()
  {
    this.userService.loading = true;
    var cid = this.sclothing['id'];
    var filters = [];
    (this.name.value == null || this.name.value.trim().length == 0) ? '' : filters.push('name__icontains-'+this.name.value);
    var filters_Str = filters.join(',');
    var query_params = { 'page' : this.current_page, 'count_per_page' : this.page_size, 'clothing_id' : cid }
    if(filters_Str != null && filters_Str.length != 0)
    {
      query_params['filters'] = filters_Str;
    }
    this.restService.get('FABRICS', null, query_params).subscribe(
      (data) => {
        this.fabrics = data['data']['fabrics']
        this.total_count = data['data']['total_count']
        this.userService.loading = false;
      },
      (data) => {
        this.snackbarService.afterRequest(data);
        this.userService.loading = false;
      }
    );
  }

  loadServices()
  {
    this.userService.loading = true;
    var query_params = {'fabric_id' : this.sfabric['id']};
    this.restService.get('FABRIC_SERVICES', null, query_params).subscribe(
      (data) => {
        this.fabricServices = data['data']
        this.userService.loading = false;
      },
      (data) => {
        this.userService.loading = false;
        this.snackbarService.afterRequest(data);
      }
    );
  }

  loadAddons()
  {
    this.userService.loading = true;
    var query_params = {'fabric_id' : this.sfabric['id'], 'service_id' : this.sfabricService['id']};
    this.restService.get('FABRIC_SERVICE_ADDONS', null, query_params).subscribe(
      (data) => {
        this.fabricServiceAddons = data['data'];
        this.userService.loading = false;
      },
      (data) => {
        this.snackbarService.afterRequest(data);
        this.userService.loading = false;
      }
    );
  }

  selectClothing(clothing)
  {
    this.userService.loading = true;
    this.fabricServiceAddons = {'assigned' : [], 'unassigned' : []};
    this.fabricServices = {'assigned' : [], 'unassigned' : []};
    this.sclothing = clothing;
    this.sfabricService = null;
    this.sfabric = null;
    this.loadFabrics();
  }

  selectFabric(fabric)
  {
    this.userService.loading = true;
    this.fabricServiceAddons = {'assigned' : [], 'unassigned' : []};
    this.sfabric = fabric;
    this.sfabricService = null;
    this.loadServices();
  }

  selectFabricService(service)
  {
    this.userService.loading = true;
    this.sfabricService = service;
    this.loadAddons();
  }

  upsertServices(service, action)
  {
    var body = {'fabric_id' : this.sfabric['id'], 'service_id' : service['id'], 'type' : 'single', 'action' : action};
    this.postFabricServices(body);
    if(action == 'remove' && this.sfabricService != null && this.sfabricService['id'] == service['id'])
    {
      this.fabricServiceAddons = {'assigned' : [], 'unassigned' : []};
      this.sfabricService = null;
    }
  }

  upsertServicesAll(action)
  {
    var body = {'fabric_id' : this.sfabric['id'], 'type' : 'all', 'action' : action};
    this.postFabricServices(body);
  }

  postFabricServices(body)
  {
    this.restService.post('FABRIC_SERVICES_UPSERT', null, null, body).subscribe(
      (data) => {
        this.fabricServices = data['data'];
        this.snackbarService.afterRequest(data);
      },
      (data) => {
        this.snackbarService.afterRequest(data);
      }
    );
  }

  upsertServiceAddons(addon, action)
  {
    var body = {'fabric_id' : this.sfabric['id'], 'service_id' : this.sfabricService['id'], 'addon_id' : addon['id'], 'type' : 'single', 'action' : action};
    this.postFabricServiceAddons(body);
  }

  upsertServiceAddonAll(action)
  {
    var body = {'fabric_id' : this.sfabric['id'], 'service_id' : this.sfabricService['id'], 'type' : 'all', 'action' : action};
    this.postFabricServiceAddons(body);
  }

  postFabricServiceAddons(body)
  {
    this.restService.post('FABRIC_SERVICE_ADDONS_UPSERT', null, null, body).subscribe(
      (data) => {
        this.fabricServiceAddons = data['data'];
        this.snackbarService.afterRequest(data);
      },
      (data) => {
        this.snackbarService.afterRequest(data);
      }
    );
  }

}
