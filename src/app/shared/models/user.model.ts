export class User {
    Email: string;
    Name: String;
    Mobile: string;
    LoggedIn : Boolean;
    AgreeTerms : boolean;
    Subscribe : boolean;
    Status : String;
    SuperUser : boolean;
    HomeUrl;
    Permissions;

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
      this.HomeUrl = '/chome';
      this.Permissions = {};
    }

    setupLoggedInUser(data)
    {
      this.Email = data['email'];
      this.Name = data['name'];
      this.Mobile = data['mobile'];
      this.LoggedIn = true;
      this.AgreeTerms = data['agree_terms'];
      this.Subscribe = data['subscribe'];
      this.Status = data['status'];
      this.SuperUser = data['is_superuser'];
      this.Permissions = data['permissions'];
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
