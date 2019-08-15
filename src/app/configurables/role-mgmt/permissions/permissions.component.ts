import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../shared/services/rest.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  groups = [];
  content_types = []
  permissions = {};
  groups_loaded = false;
  content_types_loaded = false;
  name = new FormControl();
  constructor(private restService : RestService, private snackbarService : SnackbarService, private userService : UserService) { }

  ngOnInit() {
    this.loadGroups();
    this.loadContentTypes();
  }

  reload()
  {
    this.groups = [];
    this.content_types = []
    this.permissions = {};
    this.groups_loaded = false;
    this.content_types_loaded = false;
    this.name = new FormControl();
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
    this.userService.loading = true;
    this.restService.get('CONTENT_TYPES', null, null).subscribe(
      (data) => {
        this.content_types = data['data'];
        this.userService.loading = false;
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
        this.userService.loading = false;
      }
    );
  }

  addGroup(){
    this.userService.loading = true;
    this.restService.post('CREATE_GROUP', null, null, {'name' : this.name.value}).subscribe(
      (data) => {
        this.userService.loading = false;
        this.snackbarService.afterRequest(data);
        this.reload();
      },
      (data) => {
        this.userService.loading = false;
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

  updatePermission(group, content_type, permission, pem_level, has_access)
  {
    var body = {
      'group_id' : group['id'],
      'has_access' : has_access,
      'pem_level' : pem_level
    };
    if(permission != null)
    {
      permission['has_access'] = (permission['has_access'] == true ? false : true);
      body['permissions'] = [permission['id']];
      body['has_access'] = permission['has_access'];
    }
    if(content_type != null)
    {
      body['content_type_id'] = content_type['id'];
    }
    this.userService.loading = true;
    this.restService.post('UPDATE_PERMISSION', null, null, body).subscribe(
      (data) => {
        this.snackbarService.afterRequest(data);
        this.loadContentTypes();
      },
      (data) => {
        this.snackbarService.afterRequestFailure(data);
        this.userService.loading = true;
      }
    );
  }

}
