import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { RestService } from 'src/app/shared/services/rest.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  @Input() storeId;
  workflows;
  wformcontrols = {};
  constructor(private userService : UserService, private restService : RestService, private snackbarService : SnackbarService) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices()
  {
    this.userService.loading = true;
    var query_params = {'store_id':this.storeId};
    this.restService.get('WORKFLOWS', null, query_params).subscribe(
      (data) => {
        this.workflows = data['data'];
        this.userService.loading = false;
        this.workflows.forEach(e => {
          if(e.src_selected != null && e.src_selected.id != null)
          {
            this.wformcontrols[e.service.id+'src'] = new FormControl(e.src_selected.id);
          }
          else
          {
            this.wformcontrols[e.service.id+'src'] = new FormControl('');
          }

          if(e.dest_selected != null && e.dest_selected.id != null)
          {
            this.wformcontrols[e.service.id+'dest'] = new FormControl(e.dest_selected.id);
          }
          else
          {
            this.wformcontrols[e.service.id+'dest'] = new FormControl('');
          }
        });
      },
      (data) => {
        this.userService.loading = false;
      }
    );
  }

  upsertWorkflow(workflow)
  {
    this.userService.loading = true;
    var query_params = {};
    var body = {
      "store_id" : this.storeId,
      "src_id": workflow['src_selected']['id'],
      "dest_id": this.wformcontrols[workflow['service']['id']+'dest'].value,
      "service_id": workflow['service']['id'],
    };
    this.restService.post('UPSERT_WORKFLOW', null, query_params, body).subscribe(
      (data) => {
        this.loadServices();
      },
      (data) => {
        this.userService.loading = false;
      }
    );
  }

}
