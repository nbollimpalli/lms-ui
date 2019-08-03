export class User {
    Email: string;
    Name: String;
    Mobile: string;
    LoggedIn : Boolean;
    AgreeTerms : boolean;
    Subscribe : boolean;
    Status : String;
    SuperUser : boolean;
    Staff : Boolean;
    SubscribeTransactions : boolean;
    HomeUrl;
    Permissions;
    PermissionsList;

    constructor()
    {
    }

    setupGuestUser()
    {
      this.Email = '';
      this.Name = 'Guest';
      this.Mobile = '';
      this.LoggedIn = false;
      this.AgreeTerms = true;
      this.Subscribe = false;
      this.Status = 'active';
      this.SuperUser = false;
      this.Staff = false;
      this.HomeUrl = '/chome';
      this.Permissions = {};
      this.PermissionsList = [];
    }

    setupLoggedInUser(data)
    {
      console.log('*** profile *** ');
      console.log(data);
      this.Email = data['email'];
      this.Name = data['name'];
      this.Mobile = data['mobile'];
      this.LoggedIn = true;
      this.AgreeTerms = data['agree_terms'];
      this.Subscribe = data['subscribe_newsletter'];
      this.SubscribeTransactions = data['subscribe_transactions'];
      this.Status = data['status'];
      this.Staff = data['is_staff'];
      this.SuperUser = data['is_superuser'];
      this.Permissions = data['permissions'];
      this.PermissionsList = data['permissions_list'];
      if(data['is_staff'] == true)
      {
        this.HomeUrl = '/dashboard';
      }
      else
      {
        this.HomeUrl = '/chome';
      }
    }
}
