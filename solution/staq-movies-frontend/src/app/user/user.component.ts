import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '../shared/components/navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../shared/models/types';
import { Query } from '../shared/models/query';
import { Pageable } from '../shared/models/pageable';

import { Apollo } from 'apollo-angular';
import 'rxjs/add/operator/map';
import gql from 'graphql-tag';

@Component({
  selector   : 'staq-user',
  templateUrl: './user.component.html',
  styleUrls  : [ './user.component.scss' ]
})
export class UserComponent implements OnInit {

  public navItems: NavbarItem[] = [
    {
      name    : 'Users',
      url     : '/users',
      disabled: true
    },
    {
      name: 'Movies',
      url : '/movies',
    }
  ];

  public user: User;

  constructor( private route: ActivatedRoute, private router: Router, private apollo: Apollo ) {
  }

  ngOnInit() {
    this.route.params.subscribe(( params: any ) => this.getUser(params.id));
  }

  getUser( id: number ) {
    const userQuery = gql`
        query user($userId: Int){
          user(id: $userId) {
            id
            ratings {
              movie {
                id
                title
              }
              rating
              timestamp
            }
          }
        }
      `;

    this.apollo.query<Query>({ query: userQuery, variables: { userId: id } })
        .map(result => result.data.user)
        .subscribe(( user ) => this.user = user);
  }
}
