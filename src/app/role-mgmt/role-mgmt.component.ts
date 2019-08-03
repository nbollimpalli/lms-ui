import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/services/rest.service';
import { SnackbarService } from '../shared/services/snackbar.service';

@Component({
  selector: 'app-role-mgmt',
  templateUrl: './role-mgmt.component.html',
  styleUrls: ['./role-mgmt.component.css']
})
export class RoleMgmtComponent implements OnInit {
  groups = [];
  content_types = []
  permissions = {};
  groups_loaded = false;
  content_types_loaded = false;
  constructor(private restService : RestService, private snackbarService : SnackbarService) { }

  ngOnInit() {
    this.loadGroups();
    this.loadContentTypes();
  }

  loadGroups() {
    this.restService.get('GROUPS', null, null).subscribe(
      (data) => {
        this.groups = data['data'];
        this.groups.forEach(group => {
          this.permissions[group["id"]] = [];
        });
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
      }
    );
  }

  loadContentTypes() {
    this.restService.get('CONTENT_TYPES', null, null).subscribe(
      (data) => {
        this.content_types = data['data'];
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
      }
    );
  }

  loadPermissions(group, content_type)
  {
    var params = { "group_id" : group["id"], "content_type_id" : content_type["id"] };
    var key = group["id"] + "_" + content_type["id"];
    this.restService.get('PERMISSIONS', null, params).subscribe(
      (data) => {
        this.permissions[key] = data["data"];
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
      }
    );
  }

  updatePermission(group, content_type, permission)
  {
    permission['has_access'] = (permission['has_access'] == true ? false : true);
    var body = {
      'permissions' : [permission['id']],
      'content_type_id' : content_type['id'],
      'group_id' : group['id'],
      'has_access' : permission['has_access']
    };
    this.restService.post('UPDATE_PERMISSION', null, null, body).subscribe(
      (data) => {
        this.snackbarService.afterRequest(data);
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
      }
    );
  }

}
