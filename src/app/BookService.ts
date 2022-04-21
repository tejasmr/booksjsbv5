import { Book } from "./Book";
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { first, lastValueFrom, map } from "rxjs";

export class BookService {
    private url: string;
    // books: Map<String, Book>;
    static instance: BookService;
    constructor(private http: HttpClient) {
        this.url = "https://booksjsb.herokuapp.com/v5/book"
        // this.books = new Map();
        // for(let i=0; i<20; i++) {
        //     this.books.set("" + i, new Book(i, "" + i, (Math.random() + 1).toString(36).substring(7), (Math.random() + 1).toString(26).substring(7)));
        // }
        // BookService.instance = this;
    }
    static service() {
        if (!BookService.instance) {
            BookService.instance=new BookService(new HttpClient(new HttpXhrBackend({build: ()=>new XMLHttpRequest()})));
        }
        return BookService.instance;
    }
    async getBooks(): Promise<Book[]> {
        return await lastValueFrom(this.http.get<Book[]>(this.url + "/"));
    }

    async addBook(book: Book): Promise<boolean> {
        return await lastValueFrom(this.http.post<boolean>(this.url + "/addBook", book));
    }

    async deleteBook(isbn: string): Promise<boolean> {
        return await lastValueFrom(this.http.post<boolean>(this.url + "/deleteBook", isbn));
    }

    async updateBook(book: Book): Promise<boolean> {
        return await lastValueFrom(this.http.post<boolean>(this.url + "/updateBook", book));
    }
}