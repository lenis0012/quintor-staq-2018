import { browser, by, element } from 'protractor';

export class AppPage {
  static navigateTo() {
    return browser.get('/');
  }

  static getRoute(): Promise<string> {
    return browser.getCurrentUrl();
  }
}

export class MoviePage {
  static getNavbar() {
    return element(by.css('staq-root staq-movie staq-navbar'));
  }

  static getMovieList() {
    return element(by.css('staq-root staq-movie staq-movie-list'));
  }

  static getMovieListItems() {
    return element.all(by.css('staq-root staq-movie staq-movie-list tr'));
  }

  static getMovieDetail() {
    return element(by.css('staq-root staq-movie staq-movie-detail'));
  }

  static getMovieDetailInformation() {
    return element(by.css('staq-root staq-movie staq-movie-detail .information'));
  }

  static getMovieDetailTitle() {
    return element.all(by.css('staq-root staq-movie staq-movie-detail .information tr')).first();
  }

  static getMovieDetailRatings() {
    return element(by.css('staq-root staq-movie staq-movie-detail .ratings'));
  }

  static getMovieDetailRatingsItems() {
    return element.all(by.css('staq-root staq-movie staq-movie-detail .ratings tr'));
  }

  static navigateToUserPage( row: number ) {
    this.getMovieDetailRatingsItems().get(row).element(by.css('a')).click();
  }
}

export class UserPage {
  static getNavbar() {
    return element(by.css('staq-root staq-user staq-navbar'));
  }

  static getRatingItems() {
    return element.all(by.css('staq-root staq-user tr'));
  }

  static navigateToMoviePage( row: number ) {
    this.getRatingItems().get(row).element(by.css('a')).click();
  }
}
