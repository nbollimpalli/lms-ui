export class User {
    Id : string = null;
    Email: string = '';
    Name: String;
    Mobile: string = '';
    LoggedIn : Boolean = false;
    AgreeTerms : boolean = true;
    Subscribe : boolean = true;
    Status : String;
    SuperUser : boolean = false;
    Staff : Boolean = false;
    SubscribeTransactions : boolean = true;
    HomeUrl = '/chome';
    Permissions = {};
    PermissionsList = [];
    Group = null;
    Stores = [];
    DashboardInfo = [];

    constructor()
    {
      this.setupNewUser()
    }

    setupNewUser()
    {
      this.Name = '';
      this.Status = 'pending';
    }

    setupGuestUser()
    {
      this.Name = 'Guest';
      this.Status = 'active';
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
      this.Id = data['id'];
      this.Stores = data['stores'];
      this.DashboardInfo = data['dashboard_info'];
      console.log('*****');
      console.log(this.DashboardInfo);
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
