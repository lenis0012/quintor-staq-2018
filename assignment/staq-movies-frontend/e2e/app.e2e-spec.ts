import { AppPage, MoviePage, UserPage } from './app.po';

describe('homepage', () => {

  beforeAll(AppPage.navigateTo);

  it('should redirect to movies', () => {
    AppPage.getRoute()
           .then(url => expect(url).toMatch('/movies'))
           .catch((reason => fail(reason)));
  });


  describe('movies', () => {

    it('should show navbar', () => {
      expect(MoviePage.getNavbar().isPresent()).toEqual(true);
    });

    it('should show list of movies', () => {
      expect(MoviePage.getMovieList().isPresent()).toEqual(true);
    });

    it('should show list of movies', () => {
      MoviePage.getMovieListItems().count()
               .then(count => expect(count).toEqual(16)) // 1 header + 15 rows
               .catch((reason => fail(reason)));
    });

    it('should show table header', () => {
      MoviePage.getMovieListItems().first().getText()
               .then(text => expect(text).toMatch('# title genres'))
               .catch((reason => fail(reason)));
    });

    it('should show movie info', () => {
      MoviePage.getMovieListItems().last().getText()
               .then(text => {
                 expect(text).toContain('Cutthroat Island (1995)');
                 expect(text).toContain('Adventure');
               })
               .catch((reason => fail(reason)));
    });

    it('should navigate to clicked movie', () => {
      MoviePage.getMovieListItems().get(9).click();

      AppPage.getRoute()
             .then(url => expect(url).toMatch('/movies/9'))
             .catch((reason => fail(reason)));
    });

    describe('movie detail', () => {

      it('should show movie detail', () => {
        expect(MoviePage.getMovieDetail().isPresent()).toEqual(true);
      });

      it('should show movie detail info section', () => {
        expect(MoviePage.getMovieDetailInformation().isPresent()).toEqual(true);
      });

      it('should show movie detail ratings section', () => {
        expect(MoviePage.getMovieDetailRatings().isPresent()).toEqual(true);
      });

      it('should show movie detail movie title', () => {
        MoviePage.getMovieDetailTitle().getText()
                 .then(text => expect(text).toMatch('Sudden Death'))
                 .catch((reason => fail(reason)));
      });

      it('should show table header', () => {
        MoviePage.getMovieDetailRatingsItems().first().getText()
                 .then(text => expect(text).toMatch('user rating time'))
                 .catch((reason => fail(reason)));
      });

      it('should show rating information', () => {
        MoviePage.getMovieDetailRatingsItems().last().getText()
                 .then(text => {
                   expect(text).toContain('254');
                   expect(text).toContain('Sunday, October 13, 1996');
                 })
                 .catch((reason => fail(reason)));
      });

      it('should navigate to clicked user', () => {
        MoviePage.navigateToUserPage(6);

        AppPage.getRoute()
               .then(url => expect(url).toMatch('/users/110'))
               .catch((reason => fail(reason)));
      });

    });

  });

  describe('user page', () => {

    it('should show navbar', () => {
      expect(UserPage.getNavbar().isPresent()).toEqual(true);
    });

    it('should show list of ratings', () => {
      UserPage.getRatingItems().count()
              .then(count => expect(count).toEqual(16)) // 1 header + 15 rows
              .catch((reason => fail(reason)));
    });

    it('should show table header', () => {
      UserPage.getRatingItems().first().getText()
              .then(text => expect(text).toMatch('movie rating')) // 1 header + 15 rows
              .catch((reason => fail(reason)));
    });


    it('should show table header', () => {
      UserPage.getRatingItems().last().getText()
              .then(text => expect(text).toMatch('45 5')) // 1 header + 15 rows
              .catch((reason => fail(reason)));
    });

    it('should navigate to clicked movie', () => {
      UserPage.navigateToMoviePage(8);

      AppPage.getRoute()
             .then(url => expect(url).toMatch('/movies/16'))
             .catch((reason => fail(reason)));
    });

  });

});
