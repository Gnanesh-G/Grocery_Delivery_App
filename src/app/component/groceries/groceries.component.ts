import { Component } from '@angular/core';
import { Grocery } from 'src/app/model/grocery';
import { GroceryService} from 'src/app/service/grocery.service';

@Component({
  selector: 'app-groceries',
  templateUrl: './groceries.component.html',
  styleUrls: ['./groceries.component.css']
})
export class GroceriesComponent {
  error: string = "";
  groceries:Grocery[]=[];
  constructor(private groceryService: GroceryService) {}

  ngOnInit(): void {
    this.groceryService.getAllGroceries().subscribe({
      next: (response: any) => {
        this.groceries = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  
}
