import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { DialogService } from '../shared/services/dialog.service';
@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css'],
})
export class HeaderNavComponent implements OnInit {

  menu_data = [];
  all_menu_data = [
    [
      { 
        title: 'Stores',
        icon: 'store',
        path: '/stores',
        permission: 'can_list_stores'
      },
      {
        title: 'Reports',
        icon: 'file_copy',
        path: '/reports',
        permission: 'can_list_reports'
      },
      { 
        title: 'Users',
        icon: 'supervised_user_circle',
        path: '/users',
        permission: 'can_list_users'
      },
    ],
    [
      { 
        title: 'Profile',
        icon: 'account_box',
        path: '/profile'
      },
      { 
        title: 'Wallet',
        icon: 'account_balance_wallet',
        path: '/wallet'
      },
      { 
        title: 'History',
        icon: 'history',
        path: '/history'
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
  
    
  constructor(
              public userService : UserService,
              public dialogService : DialogService,
              )  {
  }

  ngOnInit()
  {
    this.userService.successEmitter.subscribe(
      (data) => {
        var code = data['code'];
        if(code == 'login'  || code == 'logout')
        {
          this.menu_data = [];
          this.all_menu_data.forEach(menu_data => {
              var new_menu_data = [];
              menu_data.forEach(menu_data_item => {
                  var permission = menu_data_item['permission'];
                  if(permission == null || this.userService.hasPermission(permission))
                  {
                    new_menu_data.push(menu_data_item);
                  }
                }
              );
              if (new_menu_data.length > 0)
              {
                this.menu_data.push(new_menu_data);
              }
          });
          console.log(this.menu_data);
        }
      }
    );
  }

  onClickOfNotification(notification, params)
  {
    this[notification['action']](params);
  }

  verifyAccount(params)
  {
    this.dialogService.openDialog(['verify', {}]);
  }

  logout(drawer)
  {
    drawer.close();
    this.userService.logout();
  }
}
