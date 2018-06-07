import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('KpnPaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const currentPage = 13;
  const totalPages = 24;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports     : []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onPageItemClicked', () => {
    it('update current page to selected page', () => {
      const page = 46;
      component.onPageItemClicked(page);
      expect(component.currentPage).toEqual(page);
    });
  });

  describe('nextPage', () => {
    it('can go next', () => {
      component.currentPage = currentPage;
      component.totalPages = totalPages;

      component.onNextClicked();

      expect(component.currentPage).toEqual(currentPage + 1);
    });

    it('cant go next', () => {
      component.currentPage = totalPages;
      component.totalPages = totalPages;

      component.onNextClicked();

      expect(component.currentPage).toEqual(totalPages);
    });
  });

  describe('prevPage', () => {
    it('can go prev', () => {
      component.currentPage = currentPage;
      component.totalPages = totalPages;

      component.onPreviousClicked();

      expect(component.currentPage).toEqual(currentPage - 1);
    });

    it('cant go prev', () => {
      component.currentPage = 0;
      component.totalPages = totalPages;

      component.onPreviousClicked();

      expect(component.currentPage).toEqual(0);
    });
  });

  describe('justify', () => {
    it('should return the set value', () => {
      component.justifyContent = 'start';

      const justify: string = component.justify;

      expect(justify).toEqual('justify-content-start');
    });

    it('should return the default value', () => {
      const justify: string = component.justify;

      expect(justify).toEqual('justify-content-center');
    });
  });

  describe('isCurrentPage', () => {
    it('is not be current page.', () => {
      component.currentPage = currentPage;

      expect(component.isCurrentPage(1)).toBeFalsy();
    });

    it('is be current page', () => {
      component.currentPage = currentPage;

      expect(component.isCurrentPage(currentPage)).toBeTruthy();
    });
  });

  describe('get pages', () => {

    it('should return only next page', () => {
      const pageNumber = 2;

      component.totalPages = totalPages;
      const pages: number[] = component.pages;

      expect(pages).toEqual([ pageNumber ]);
    });

    it('should return only previous page', () => {
      component.currentPage = totalPages;
      component.totalPages = totalPages;

      const pages: number[] = component.pages;

      expect(pages).toEqual([ totalPages - 1 ]);
    });

    it('should return next, current and previous page', () => {
      component.currentPage = currentPage;
      component.totalPages = totalPages;

      const pages: number[] = component.pages;

      expect(pages).toEqual([
        currentPage - 1,
        currentPage,
        currentPage + 1
      ]);
    });

  });

});
