import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title = '';

  constructor( private userService: UserService,
               private router: Router ) { }

  ngOnInit() {}

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
