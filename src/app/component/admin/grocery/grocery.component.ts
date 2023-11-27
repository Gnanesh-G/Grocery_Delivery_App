import { Component, OnInit } from '@angular/core';
import { Grocery } from 'src/app/model/grocery';
import { GroceryService } from 'src/app/service/grocery.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css'],
})
export class AdminGroceryComponent implements OnInit {
  error: string = '';
  //INITIAL_GROCERY: Grocery = { id: 0, title: "",description:"",price:0 };
  id: number = 0;
  title: String = '';
  description:String = '';
  price = 0;
  btn: string = 'Add';
  editId: number = 0;
  groceries: Grocery[] = [];

  //groceryModel: Grocery = this.INITIAL_GROCERY;
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

  onSubmit(form: any) {
    if (this.editId == 0) {
      //console.log('adddddd');

      this.groceryService
        .postGroceries({
          title: this.title,
          description: this.description,
          price: this.price,
          categoryId: 1,
        })
        .subscribe({
          next: (response: any) => {
            this.groceries = response.data;
            this.title = '';
            this.description='';
            this.price=0;
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
    } else {
      //console.log('edittttt');

      let newCategory = {
        id: this.id,
        title: this.title,
        description: this.description,
        price: this.price,
        categoryId:1,
      };
      this.groceryService.putGroceries(newCategory).subscribe({
        next: (response: any) => {
          this.groceries = response.data;
          this.title = '';
          this.description='';
          this.price=0;
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
    console.log(id);
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
}
