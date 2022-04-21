import { Component, ViewChild, AfterViewInit, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { BookService } from '../BookService';
import { Book } from '../Book';
// import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnChanges {
  
  @Output() deleteBookEvent = new EventEmitter<string>();
  @Output() updateBookEvent = new EventEmitter<Book>();
  @Output() sortBookEvent = new EventEmitter<Sort>();

  displayedColumns: string[] = ['isbn', 'name', 'author', 'actions']
  bookService = BookService.service();
  @Input() dataSource!: MatTableDataSource<Book>;
  constructor(public dialog: MatDialog) {}
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  async ngOnInit() {
    this.dataSource.data = await this.bookService.getBooks();
    // this.bookService.getBooks().subscribe((x: Book) => this.dataSource.data.push(x), err => console.error(err),() => {});
    this.dataSource.paginator = this.paginator;
  }

  async ngOnChanges() {
    this.dataSource.data = await this.bookService.getBooks();
    this.dataSource.paginator = this.paginator;
  }
  
  deleteBook(isbn: string): void {
    this.deleteBookEvent.emit(isbn);
  }

  updateBook(book: Book): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      width: '250px',
      data: new Book(book.id, book.isbn, book.name, book.author)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.updateBookEvent.emit(result);
    });

  }
  async sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    console.log(sort, "pushed");
    this.sortBookEvent.emit(sort);
  }
}
