import { Component, Inject,  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../Book';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  constructor(public dialogRef: MatDialogRef<UpdateBookComponent>, @Inject(MAT_DIALOG_DATA) public book: Book) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
