import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import {PageEvent} from '@angular/material';
import { RestService } from '../../shared/services/rest.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators'; 
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PricesComponent implements OnInit, OnDestroy {
  // MatPaginator Inputs
  current_page = 1;
  total_count = 10;
  length = 100;
  page_size = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  name = new FormControl();
  type = new FormControl();
  subscriptions : Subscription[] = [];
  
  typeList: string[] = ['amount', 'percentage'];

  dataSource;

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
    this.loadPrices();
  }
  
  ngOnInit() {
    this.loadPrices()
    this.initFilters();
    this.userService.successEmitter.subscribe(
      (data) => {
        var code = data['code'];
        if(code == 'price')
        {
          this.loadPrices();
        }
      }
    );
  }

  initFilters()
  {
    this.unsubscribe();
    this.name = new FormControl();
    this.type = new FormControl();
    this.setDebouncers(this.name);
    this.setDebouncers(this.type);
    this.loadPrices();
  }

  setDebouncers(frmctrl)
  {
    var sub = frmctrl.valueChanges
      .pipe(
        debounceTime(500), tap(data => { console.log(data) })
      )
      .subscribe((data) => {
        this.loadPrices();
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

  loadPrices()
  {
    console.log(this.type.value);
    var filters = [];
    (this.name.value == null || this.name.value.trim().length == 0) ? '' : filters.push('name__icontains-'+this.name.value);
    (this.type.value == null || this.type.value.length == 0) ? '' : filters.push('type__in-'+this.type.value.join('~'));
    var filters_Str = filters.join(',');
    var query_params = { 'page' : this.current_page, 'count_per_page' : this.page_size }
    if(filters_Str != null && filters_Str.length != 0)
    {
      query_params['filters'] = filters_Str;
    }
    this.restService.get('PRICES', null, query_params).subscribe(
      (data) => {
        this.dataSource = data['data']['prices']
        this.total_count = data['data']['total_count']
        console.log(this.dataSource);
      },
      (data) => {
        this.snackbarService.afterRequest(data);
      }
    );
  }

}
