import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector   : 'staq-navbar',
  templateUrl: './navbar.component.html',
  styleUrls  : [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {

  @Input() navigationItems: NavbarItem[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  public getNavItemClass( navbarItem: NavbarItem ): string {

    if (navbarItem.active) {
      return 'active';
    }

    if (navbarItem.disabled) {
      return 'disabled';
    }

    return '';

  }

}

export interface NavbarItem {
  name: string;
  url: string;
  disabled?: boolean;
  active?: boolean;
}
