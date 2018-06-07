import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'staq-pagination',
  templateUrl: './pagination.component.html',
  styleUrls  : [ './pagination.component.scss' ]
})
export class PaginationComponent implements OnInit {

  @Input() public currentPage = 1;
  @Input() public totalPages = 1;

  @Input() public justifyContent: 'center' | 'start' | 'end' = 'center';
  @Input() public showTextualButtons = true;

  @Output() public paginationClicked: EventEmitter<number> = new EventEmitter<number>();

  private readonly pageOffset: number = 1;
  private readonly minimumStartPage: number = 2;

  public constructor() {
  }

  public ngOnInit(): void {
  }

  public onPageItemClicked( index: number ): void {
    this.currentPage = index;
    this.paginationClicked.emit(index);
  }

  public onNextClicked(): void {
    if (this.currentPage + 1 <= this.totalPages) {
      this.currentPage++;
    }
    this.paginationClicked.emit(this.currentPage);
  }

  public onPreviousClicked(): void {
    if (this.currentPage - 1 >= 1) {
      this.currentPage--;
    }
    this.paginationClicked.emit(this.currentPage);
  }

  public get justify(): string {
    return `justify-content-${this.justifyContent}`;
  }

  public isCurrentPage( pageIndex: number ): boolean {
    return pageIndex === this.currentPage;
  }

  public get pages(): number[] {
    const listOfPages: number[] = [];

    let startIndex: number = this.currentPage - this.pageOffset;

    if (startIndex <= 1) {
      startIndex = this.minimumStartPage;
    }

    for (let i: number = startIndex; i <= this.currentPage + this.pageOffset; i++) {
      if (i === this.totalPages) {
        break;
      }

      listOfPages.push(i);
    }

    return listOfPages;
  }
}
