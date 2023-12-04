import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryService } from 'src/app/service/grocery.service';
import { Grocery } from 'src/app/model/grocery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  error: string = '';
  groceries: Grocery[] = [];
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
}
