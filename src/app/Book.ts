export class Book {
    id: number;
    isbn: string;
    name: string;
    author: string;

    constructor(id: number, isbn: string, name: string, author: string) {
        this.id = id;
        this.isbn = isbn;
        this.name = name;
        this.author = author;
    }
}