import { Component, OnInit } from '@angular/core';
import { NavbarItem } from '../shared/components/navbar/navbar.component';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Rating } from '../shared/models/types';
import { Pageable } from '../shared/models/pageable';

@Component({
  selector   : 'staq-user',
  templateUrl: './user.component.html',
  styleUrls  : [ './user.component.scss' ]
})
export class UserComponent implements OnInit {

  public userId: number;

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

  public ratings: Rating[] = [];
  public ratingsPageOptions: Pageable = {};


  constructor( private route: ActivatedRoute, private userService: UserService ) {
  }

  ngOnInit() {
    this.route.params.subscribe(( params: any ) => {
      this.userId = params.id;
      this.getRatings();
    });

  }

  getRatings( page: number = 0 ): void {
    this.userService.getRatings(this.userId, page).subscribe(( next: any ) => {
      this.ratings = next.content;
      this.ratingsPageOptions = {
        page      : next.number + 1,
        totalPages: next.totalPages,
        size      : next.numberOfElements
      };
    });
  }


  updatePage( page: number ) {
    this.getRatings(page - 1);
  }
}
