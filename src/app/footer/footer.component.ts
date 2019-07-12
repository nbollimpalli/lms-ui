import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})





export class FooterComponent {
  constructor(private breakpointObserver: BreakpointObserver) {}
  services_data = [
    { title: 'Company', icon_type: 'icon', services:
      ['About Us', 'News', 'Jobs', 'Contact us']
    },
    { title: 'Policy', icon_type: 'icon', link_urls: true, services:
      ['Application security', 'Software principles']
    },
    { title: 'Follow us on', icon_type: 'img_icon', link_urls: true, services:
      ['Facebook', 'Twitter', 'Linked-In', 'Instagram']
    }
  ];

  img_icon_data = {
    'Facebook' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-facebook.svg',
    'Twitter' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-twitter.svg',
    'Linked-In' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-linkedin.svg',
    'Instagram' : 'https://s3.ap-south-1.amazonaws.com/algovent-static/algo-insta.svg'
  };

  link_url_data = {
    'Facebook' : 'https://www.facebook.com/pg/algovent',
    'Twitter' : 'https://twitter.com/algovent',
    'Linked-In' : 'https://www.linkedin.com/company/algovent/',
    'Instagram' : 'https://www.instagram.com/algovent_official/'
  };

  icon_data = {
    'Pet Services' : 'pets',
    'Digital Services' : 'fingerprint',
    'Hyper Local Services' : 'local_activity',
    'Personlized Apps' : 'account_box',
    'Company' : 'business',
    'Products' : 'device_hub',
    'Learn More' : 'expand_more',
    'Follow us on' : 'share',
    'About Us' : 'free_breakfast',
    'News' : 'tune',
    'Jobs' : 'work',
    'Contact us' : 'email',
    'Support' : 'contact_support',
    'Developers' : 'developer_board',
    'Documentation' : 'library_books',
    'Application security' : 'security',
    'Software principles' : 'vpn_key'
  };

  position_matrix = {cols: 1, rows: 1};
  bp = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    map(({ matches }) => {
      if (matches) {
        console.log('in small');
        this.setDashBoardLayout(6, 1);
        return;
      }
      console.log('in large');
      this.setDashBoardLayout(1, 1);
      return;
    })
  );

  getIcon(iconType, iconSubject) {
    if (iconType === 'img_icon') {
      return this.img_icon_data[iconSubject];
    } else if (iconType === 'icon') {
      return this.icon_data[iconSubject];
    }
    return '';
  }


  setDashBoardLayout(col: number, row: number) {
    this.position_matrix.cols = col;
    this.position_matrix.rows = row;
    return;
  }

}
