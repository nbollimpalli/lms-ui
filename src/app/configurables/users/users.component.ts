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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsersComponent implements OnInit, OnDestroy {
  // MatPaginator Inputs
  current_page = 1;
  total_count = 10;
  length = 100;
  page_size = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  is_staff = 'False';
  name = new FormControl();
  mobile = new FormControl();
  email = new FormControl();
  status = new FormControl();
  subscriptions : Subscription[] = [];
  
  statusList: string[] = ['pending', 'active', 'inactive', 'blocked'];

  dataSource;
  columnsToDisplay = ['name', 'mobile', 'email', 'status'];

  constructor(private userService : UserService, private restService : RestService, private snackbarService : SnackbarService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => {
      var type = params['type']
      if(type == 'staff')
      {
        this.is_staff = 'True';
      }
    } );
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
    this.loadUsers();
  }
  
  ngOnInit() {
    this.loadUsers()
    this.setDebouncers(this.name);
    this.setDebouncers(this.mobile);
    this.setDebouncers(this.email);
    this.setDebouncers(this.status);
  }

  setDebouncers(frmctrl)
  {
    var sub = frmctrl.valueChanges
      .pipe(
        debounceTime(500), tap(data => { console.log(data) })
      )
      .subscribe((data) => {
        this.loadUsers();
      });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach( element => {
      element.unsubscribe();
    } );
  }

  loadUsers()
  {
    this.userService.loading = true;
    console.log(this.status.value);
    var filters = 'is_staff-'+this.is_staff;
    filters = filters + ( (this.name.value == null || this.name.value.trim().length == 0) ? '' : ',name__icontains-'+this.name.value);
    filters = filters + ( (this.mobile.value == null || this.mobile.value.trim().length == 0) ? '' : ',mobile__icontains-'+this.mobile.value);
    filters = filters + ( (this.email.value == null || this.email.value.trim().length == 0) ? '' : ',email__icontains-'+this.email.value);
    filters = filters + ( (this.status.value == null || this.status.value.length == 0) ? '' : ',status__in-'+this.status.value.join('~'));
    var   query_params = { 'filters' : filters, 'page' : this.current_page, 'count_per_page' : this.page_size }
    this.restService.get('USERS', null, query_params).subscribe(
      (data) => {
        this.dataSource = data['data']['users']
        this.total_count = data['data']['total_count']
        console.log(this.dataSource);
        this.userService.loading = false;
      },
      (data) => {
        this.snackbarService.afterRequest(data);
        this.userService.loading = false;
      }
    );
  }

}