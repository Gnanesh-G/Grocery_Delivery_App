import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Grocery } from 'src/app/model/grocery';
import { GroceryService } from 'src/app/service/grocery.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css'],
})
export class AdminGroceryComponent implements OnInit {
  error: string = '';
  id: number = 0;
  photo: string = '';
  title: String = '';
  description: String = '';
  price = 0;
  btn: string = 'Add';
  editId: number = 0;
  groceries: Grocery[] = [];
  file: string = '';

  constructor(private groceryService: GroceryService) {}

  ngOnInit(): void {
    this.groceryService.getAllGroceries().subscribe({
      next: (response: any) => {
        this.groceries = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onSubmit(productForm: NgForm) {
    if (this.editId == 0) {
      const formData = new FormData();
      formData.append('photo', this.file);
      formData.append('title', productForm.value.title);
      formData.append('description', productForm.value.description);
      formData.append('categoryId', '1');
      formData.append('price', productForm.value.price.toString());

      this.groceryService.postGroceries(formData).subscribe({
        next: (response: any) => {
          this.title = '';
          this.description = '';
          this.price = 0;
          this.ngOnInit();
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    } else {
      const formData = new FormData();
      formData.append('photo', this.file);
      formData.append('id', this.id.toString());
      formData.append('title', productForm.value.title);
      formData.append('description', productForm.value.description);
      formData.append('categoryId', '1');
      formData.append('price', productForm.value.price.toString());
      this.groceryService.putGroceries(formData).subscribe({
        next: () => {
          this.title = '';
          this.description = '';
          this.price = 0;
          this.btn = 'Add';
          this.ngOnInit();
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }

  onEdit(id: number) {
    this.btn = 'Edit';
    this.id = id;
    this.editId = -1;
    let newCategory = this.groceries.find((o) => o.id == id);
    this.title = newCategory?.title!;
    this.description = newCategory?.description!;
    this.price = newCategory?.price!;
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.groceryService.deleteGroceries(id).subscribe({
        next: (response: any) => {
          this.groceries = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }
}
