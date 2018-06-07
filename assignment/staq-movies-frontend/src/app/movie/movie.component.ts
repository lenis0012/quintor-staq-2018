import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '../shared/components/navbar/navbar.component';

@Component({
  selector   : 'staq-movie',
  templateUrl: './movie.component.html',
  styleUrls  : [ './movie.component.scss' ]
})
export class MovieComponent implements OnInit {

  public navItems: NavbarItem[] = [
    {
      name  : 'Users',
      url   : '/users',
      disabled: true
    },
    {
      name: 'Movies',
      url : '/movies',
      active: true
    }
  ];

  constructor() {
  }

  ngOnInit() {

  }
}
