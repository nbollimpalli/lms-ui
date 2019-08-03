import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { Observable } from 'rxjs';
import { Dimension } from '../interfaces/dimension';
import { UserService } from './user.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { VerifyComponent } from 'src/app/auth/verify/verify.component';

const dialog_sizes = {
    'auth' : {
        'xl' : {'w' : '25vw', 'h' : '30vh'},
        'lg' : {'w' : '35vw', 'h' : '30vh'},
        'md' : {'w' : '40vw', 'h' : '40vh'},
        'sm' : {'w' : '60vw', 'h' : '50vh'},
        'xs' : {'w' : '100vw', 'h' : '70vh'},
    }
}
const authDimension : Dimension = dialog_sizes['auth']['xl'];

const dialogComponents = {
    'login' : {
        'c' : LoginComponent,
        'd' : authDimension
    },
    'signup' : {
        'c' : SignupComponent,
        'd' : authDimension
    },
    'verify' : {
        'c' : VerifyComponent,
        'd' : authDimension
    },
  };

@Injectable()
export class DialogService {
  public size$: Observable<string>;
  
  dialogRefs = {}

  constructor(
    public dialog: MatDialog,
    private breakpointObserverService: BreakpointObserverService,
    private userService : UserService
  )
  {
    this.listenToSizeChange();
    this.listenToDialogFeedback();
  }

  listenToSizeChange()
  {
    this.size$ = this.breakpointObserverService.size$;
    this.size$.subscribe(
        (data) => {
            console.log('********************');
            console.log(data);
            authDimension.w = dialog_sizes['auth'][data]['w'];
            authDimension.h = dialog_sizes['auth'][data]['h'];
        }
    );
  }

  listenToDialogFeedback()
  {
    this.userService.successEmitter.subscribe(
        (data) => {
            var code = data['code'];
            var action = data['action'];
            this.closeDialog([code]);
            this.performAction(action, data);
            
        }
    );
  }

  performAction(action, data)
  {
    if(action != null)
    {
        var params = data['params'];
        this[action](params);
    }
  }

  openDialog(params): void {
    if(params == null || params.length != 2)
    {
        return;
    }
    var dialogName = params[0];
    var dialogData = params[1];
    const dialogRef = this.dialog.open(dialogComponents[dialogName]['c'], {
      width: dialogComponents[dialogName]['d'].w,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    this.dialogRefs[dialogName] = dialogRef;
  }

  closeDialog(params)
  {
    if(params == null || params.length != 1)
    {
        return;
    }
    var dialogName = params[0];
    var dialogRef = this.dialogRefs[dialogName];
    if(dialogRef != null)
    {
        dialogRef.close();
        
    }
  }
}
