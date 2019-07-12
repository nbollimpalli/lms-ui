import { Permission } from "./permission.model";

export class User {
    Email: string;
    Name: String;
    Mobile: string;
    Password: string;
    LoggedIn : Boolean;
    SendToMailId : String;
    SendToMobile : String;
    UserPermission : Permission;
    ProfileUpdationPending : boolean;
    AgreeTerms : boolean;
    Subscribe : boolean;
    SubscribeApp : boolean;
    UserState : String;

    constructor()
    {
      this.Name = 'Guest';
      this.ProfileUpdationPending = false;
      this.UserPermission = new Permission();
      this.AgreeTerms = true;
      this.Subscribe = false;
      this.SubscribeApp = false;
      this.LoggedIn = false;
      this.UserState = 'any';
    }
}
