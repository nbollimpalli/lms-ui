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
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DamagesComponent implements OnInit, OnDestroy {
  // MatPaginator Inputs
  current_page = 1;
  total_count = 10;
  length = 100;
  page_size = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  name = new FormControl();
  subscriptions : Subscription[] = [];

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
    this.loadDamages();
  }
  
  ngOnInit() {
    this.loadDamages()
    this.initFilters();
    this.userService.successEmitter.subscribe(
      (data) => {
        var code = data['code'];
        if(code == 'damage')
        {
          this.loadDamages();
        }
      }
    );
  }

  initFilters()
  {
    this.unsubscribe();
    this.name = new FormControl();
    this.setDebouncers(this.name);
    this.loadDamages();
  }

  setDebouncers(frmctrl)
  {
    var sub = frmctrl.valueChanges
      .pipe(
        debounceTime(500), tap(data => { console.log(data) })
      )
      .subscribe((data) => {
        this.loadDamages();
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

  loadDamages()
  {
    var filters = [];
    (this.name.value == null || this.name.value.trim().length == 0) ? '' : filters.push('name__icontains-'+this.name.value);
    var filters_Str = filters.join(',');
    var query_params = { 'page' : this.current_page, 'count_per_page' : this.page_size }
    if(filters_Str != null && filters_Str.length != 0)
    {
      query_params['filters'] = filters_Str;
    }
    this.restService.get('DAMAGES', null, query_params).subscribe(
      (data) => {
        this.dataSource = data['data']['damages']
        this.total_count = data['data']['total_count']
        console.log(this.dataSource);
      },
      (data) => {
        this.snackbarService.afterRequest(data);
      }
    );
  }

}
