import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class AdminCategoryComponent implements OnInit {
  error: string = '';
  emitterValue = false;
  id: number = 0;
  title: string = '';
  btn: string = 'Add';
  editId: number = 0;

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onSubmit(form: any) {
    if (this.editId == 0) {
      //console.log('adddddd');

      this.categoryService.postCategory({ title: this.title }).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.title = '';
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    } else {
      //console.log('edittttt');

      let newCategory = { id: this.id, title: this.title };
      this.categoryService.putCategory(newCategory).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.title = '';
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
    let newCategory = this.categories.find((o) => o.id == id);
    this.title = newCategory?.title!;
  }

  onDelete(id: number | undefined) {
    console.log(id);
    if (id !== undefined) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.categories = response.data;
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
}
