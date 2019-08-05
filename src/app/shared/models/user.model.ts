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
    Group;

    constructor()
    {
      this.setupNewUser()
    }

    setupNewUser()
    {
      this.Email = '';
      this.Name = '';
      this.Mobile = '';
      this.LoggedIn = false;
      this.AgreeTerms = true;
      this.Subscribe = true;
      this.SubscribeTransactions = true;
      this.Status = 'pending';
      this.SuperUser = false;
      this.Staff = false;
      this.HomeUrl = '/chome';
      this.Permissions = {};
      this.PermissionsList = [];
      this.Group = null;
    }

    setupGuestUser()
    {
      this.Email = '';
      this.Name = 'Guest';
      this.Mobile = '';
      this.LoggedIn = false;
      this.AgreeTerms = true;
      this.Subscribe = true;
      this.SubscribeTransactions = true;
      this.Status = 'active';
      this.SuperUser = false;
      this.Staff = false;
      this.HomeUrl = '/chome';
      this.Permissions = {};
      this.PermissionsList = [];
      this.Group = null;
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
      this.Group = data['group'];
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
