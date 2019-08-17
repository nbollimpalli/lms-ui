import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
  selector: 'app-price-book-entries',
  templateUrl: './price-book-entries.component.html',
  styleUrls: ['./price-book-entries.component.css']
})

export class PriceBookEntriesComponent implements OnInit, OnDestroy {
  // MatPaginator Inputs
  @Input() pricebook : any;
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
  fabricServices = [];
  fabricServiceAddons = [];
  
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
        if(code == 'pricebookentry')
        {
          this.loadServices();
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
    if(this.sfabric == null)
    {
      return;
    }
    this.userService.loading = true;
    var query_params = {'fid' : this.sfabric['id'], 'search_for' : 'fs_prices', 'pricebook_id':this.pricebook['id']};
    this.restService.get('PRICEBOOK_ENTRIES', null, query_params).subscribe(
      (data) => {
        this.fabricServices = data['data']
        console.log(this.fabricServices);
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
    if(this.sfabricService == null)
    {
      return;
    }
    this.userService.loading = true;
    var query_params = {'fsid' : this.sfabricService['fsid'], 'search_for' : 'fsa_prices', 'pricebook_id':this.pricebook['id']};
    this.restService.get('PRICEBOOK_ENTRIES', null, query_params).subscribe(
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
    this.fabricServiceAddons = [];
    this.fabricServices = [];
    this.sclothing = clothing;
    this.sfabricService = null;
    this.sfabric = null;
    this.loadFabrics();
  }

  selectFabric(fabric)
  {
    this.userService.loading = true;
    this.fabricServiceAddons = [];
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

  callPbeDialog(type,action,amount,updat_for,fs,fsa,pbeid)
  {
    var data = {
      'type':type, 
      'action':action, 
      'initial_amount': (amount == null ? 0 : amount), 
      'update_for':updat_for, 
      'fid':this.sfabric['id'], 
      'fsid':fs['fsid'],
      'fsaid':fsa['fsaid'],
      'pbid':this.pricebook['id'],
      'pbeid':pbeid
    }
    this.dialogService.openDialog(['pricebookentry', data])
  }
}

