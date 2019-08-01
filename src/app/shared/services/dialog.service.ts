import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../../auth/login/login.component';
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { Observable } from 'rxjs';
import { Dimension } from '../interfaces/dimension';
import { UserService } from './user.service';
import { SignupComponent } from 'src/app/auth/signup/signup.component';

@Injectable()
export class DialogService {
  public loginDialogRef;
  public size$: Observable<string>;
  dialog_sizes = {
    'auth' : {
        'xl' : {'w' : '25vw', 'h' : '30vh'},
        'lg' : {'w' : '35vw', 'h' : '30vh'},
        'md' : {'w' : '40vw', 'h' : '40vh'},
        'sm' : {'w' : '60vw', 'h' : '50vh'},
        'xs' : {'w' : '100vw', 'h' : '70vh'},
    }
}
  authDimension : Dimension = this.dialog_sizes['auth']['xl'];
  
  dialogComponents = {
    'login' : {
        'c' : LoginComponent,
        'd' : this.authDimension
    },
    'signup' : {
        'c' : SignupComponent,
        'd' : this.authDimension
    }
  };
  
  dialogRefs = {}

  constructor(
    public loginDialog: MatDialog,
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
            this.authDimension.w = this.dialog_sizes['auth'][data]['w'];
            this.authDimension.h = this.dialog_sizes['auth'][data]['h'];
        }
    );
  }

  listenToDialogFeedback()
  {
    this.userService.successEmitter.subscribe(
        (data) => {
            var code = data['code'];
            this.closeDialog(code);
        }
    );
  }

  openDialog(dialogName, dialogData): void {
    const dialogRef = this.loginDialog.open(this.dialogComponents[dialogName]['c'], {
      width: this.dialogComponents[dialogName]['d'].w,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    this.dialogRefs[dialogName] = dialogRef;
  }

  closeDialog(dialogName)
  {
      var dialogRef = this.dialogRefs[dialogName];
      if(dialogRef != null)
      {
          dialogRef.close();
      }
  }
}
