import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent {

  menu_data = [
    [
      { 
        title: 'Stores',
        icon: 'store',
        path: '/stores'
      },
      {
        title: 'Reports',
        icon: 'file_copy',
        path: '/reports'
      },
      { 
        title: 'Users',
        icon: 'supervised_user_circle',
        path: '/users'
      },
    ],
    [
      { 
        title: 'Profile',
        icon: 'account_box',
        path: '/profile'
      },
      { 
        title: 'Settings',
        icon: 'settings',
        path: '/settings'
      }
    ],
    [
      { 
        title: 'Support',
        icon: 'headset_mic',
        path: '/support'
      },
      {
        title: 'Feedback',
        icon: 'feedback',
        path: '/feedback'
      }
    ]
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  x : UserService = null;
  
  constructor(private breakpointObserver: BreakpointObserver, private router : Router,private userService : UserService) {
    this.x = userService;
  }
}
