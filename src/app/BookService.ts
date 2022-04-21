import { Book } from "./Book";
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { lastValueFrom } from "rxjs";
import { Sort } from "@angular/material/sort";

export class BookService {
    private url: string;
    static instance: BookService;
    sort: Sort;

    constructor(private http: HttpClient) {
        this.url = "https://booksjsb.herokuapp.com/v5/book"
        this.sort = {active: "isbn", direction: "asc"};
    }
    
    static service() {
        if (!BookService.instance) {
            BookService.instance=new BookService(new HttpClient(new HttpXhrBackend({build: ()=>new XMLHttpRequest()})));
        }
        return BookService.instance;
    }
    
    async getBooks(): Promise<Book[]> {
        return await lastValueFrom(this.http.get<Book[]>(this.url + "/" + "?sortBy=" + this.sort.active + "&?order=" + (this.sort.direction === "asc" ? "ASC" : "DESC")));
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

    sorted(sort: Sort) {
        this.sort = sort;
    }
}