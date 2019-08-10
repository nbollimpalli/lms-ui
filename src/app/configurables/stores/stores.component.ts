import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {PageEvent} from '@angular/material';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators'; 


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class StoresComponent implements OnInit, OnDestroy {
  @Input() org_id:string;
  // MatPaginator Inputs
  current_page = 1;
  total_count = 10;
  length = 100;
  page_size = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  name = new FormControl();
  telephone = new FormControl();
  type = new FormControl();
  subscriptions : Subscription[] = [];
  
  typeList: string[] = ['public', 'processing', 'satellite', 'partial_processing'];

  dataSource;
  columnsToDisplay = ['name', 'mobile', 'email', 'status'];

  constructor(private userService : UserService, private restService : RestService, private snackbarService : SnackbarService, private route: ActivatedRoute) { 
  }

  



  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  setPagination(pageEvent)
  {
    console.log(pageEvent);
    this.current_page = pageEvent.pageIndex + 1;
    this.page_size = pageEvent.pageSize;
    this.loadStores();
  }
  
  ngOnInit() {
    this.loadStores()
    this.initFilters();
  }

  initFilters()
  {
    this.unsubscribe();
    this.name = new FormControl();
    this.telephone = new FormControl();
    this.type = new FormControl();
    this.setDebouncers(this.name);
    this.setDebouncers(this.telephone);
    this.setDebouncers(this.type);
    this.loadStores();
  }

  setDebouncers(frmctrl)
  {
    var sub = frmctrl.valueChanges
      .pipe(
        debounceTime(500), tap(data => { console.log(data) })
      )
      .subscribe((data) => {
        this.loadStores();
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

  loadStores()
  {
    console.log(this.type.value);
    var filters = [];
    (this.name.value == null || this.name.value.trim().length == 0) ? '' : filters.push('name__icontains-'+this.name.value);
    (this.telephone.value == null || this.telephone.value.trim().length == 0) ? '' : filters.push('telephone__icontains-'+this.telephone.value);
    (this.type.value == null || this.type.value.length == 0) ? '' : filters.push('type__in-'+this.type.value.join('~'));
    var filters_Str = filters.join(',');
    var query_params = { 'page' : this.current_page, 'count_per_page' : this.page_size, 'org_id' : this.org_id };
    if(filters_Str != null && filters_Str.length != 0)
    {
      query_params['filters'] = filters_Str;
    }
    this.restService.get('STORES', null, query_params).subscribe(
      (data) => {
        this.dataSource = data['data']['stores']
        this.total_count = data['data']['total_count']
        console.log(this.dataSource);
      },
      (data) => {
        this.snackbarService.afterRequest(data);
      }
    );
  }

}
