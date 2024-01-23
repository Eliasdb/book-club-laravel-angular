import { Component, NgZone, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  template: `
    <div class="router-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Library management';
  showHeaderFooter: boolean = true;
  private accountService = inject(AccountService);

   ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }


  constructor (private zone: NgZone, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/register') {
          this.showHeaderFooter= false;
        } 
      }
    });

     this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.showHeaderFooter= false;
        } 
      }
    });
  }
}
