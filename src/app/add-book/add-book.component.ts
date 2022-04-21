import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Book } from '../Book';
import { BookService } from '../BookService';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Output() addBookEvent: EventEmitter<Book> = new EventEmitter<Book>();
  bookService: BookService;
  formBuilder: FormBuilder;
  addBookForm: FormGroup;
  constructor() {
    this.bookService = BookService.service();
    this.formBuilder = new FormBuilder();
    this.addBookForm = this.formBuilder.group({
      isbn: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void { }

  onAddButtonPressed() {
    const isbn: string = this.addBookForm.value["isbn"];
    const id: number = parseInt(isbn);
    const name: string = this.addBookForm.value["name"];
    const author: string = this.addBookForm.value["author"];

    this.addBookEvent.emit(new Book(id, isbn, name, author));
    this.addBookForm.reset();
    
    Object.keys(this.addBookForm.controls).forEach(key =>{
      this.addBookForm.controls[key].setErrors(null)
    });
  }

  get isbn() { return this.addBookForm.get("isbn"); }
  get name() { return this.addBookForm.get("name"); }
  get author() { return this.addBookForm.get("author"); }
}
