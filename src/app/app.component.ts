import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from './Book';
import { BookService } from './BookService';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'booksjsbv5';
  dataSource = new MatTableDataSource<Book>([]);
  bookService = BookService.service();
  constructor(private snackBar: MatSnackBar) {
    this.dataSource.data = [];
  }
  async ngOnInit() {
    this.dataSource.data = await this.bookService.getBooks();
  }
  async addBook($event: Book) {
    const didAdd: boolean = await this.bookService.addBook($event);
    this.dataSource.data = await this.bookService.getBooks();
    if(didAdd) {
      this.snackBar.open(
        'Successfully added', 'Dismiss', {
          duration: 2000,
          panelClass: ['success']
        }
      );
    }
    else {
      this.snackBar.open(
        'Failed to add', 'Dismiss', {
          duration: 2000,
          panelClass: ['failure']
        }
      )
    }
  }

  async deleteBook($event: string) {
    const didDelete: boolean = await this.bookService.deleteBook($event);
    this.dataSource.data = await this.bookService.getBooks();
    if(didDelete) {
      this.snackBar.open(
        'Successfully deleted', 'Dismiss', {
          duration: 2000,
          panelClass: ['success']
        }
      );
    }
    else {
      this.snackBar.open(
        'Failed to delete', 'Dismiss', {
          duration: 2000,
          panelClass: ['failure']
        }
      )
    }
  }

  async updateBook($event: Book) {
    const didUpdate: boolean = await this.bookService.updateBook($event);
    this.dataSource.data = await this.bookService.getBooks();
    if(didUpdate) {
      this.snackBar.open(
        'Successfully updated', 'Dismiss', {
          duration: 2000,
          panelClass: ['success']
        }
      );
    }
    else {
      this.snackBar.open(
        'Failed to update', 'Dismiss', {
          duration: 2000,
          panelClass: ['failure']
        }
      );
    }
  }
  async sortBook($event: Sort) {
    this.dataSource.data = await this.bookService.sorted($event);
    console.log(this.dataSource.data);
  }
}
