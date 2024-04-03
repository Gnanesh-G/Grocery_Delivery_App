import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceryService } from 'src/app/service/grocery.service';
import { Grocery } from 'src/app/model/grocery';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  error: string = '';
  groceries: Grocery[] = [];
  //filteredGroceries: Grocery[] = [];
  //isSearchVisible:boolean=false;
  //searchTerm:string=''
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  itemsPerPage: number = 3;
  currentPage: number = 1;
  constructor(private groceryService: GroceryService,private storageService:StorageService) {
    if(storageService.getAuthData()){
      this.isLoggedIn = true;
    }
  }
  ngOnInit(): void {
    //window.onclick=()=>this.filterReset();
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
  login():void{
    
  }

  //returns total no of pages based on total no of items
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.groceries.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
 
  //returns last page
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }


  // filterGroceries():void{
  //   this.filteredGroceries = this.groceries.filter((grocery) =>
  //     grocery.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  //   console.log(this.groceries,"new");
  //   console.log(this.filterGroceries,"s");
    
    
 
  // }
  // toggleSearch() {
  //   this.isSearchVisible = !this.isSearchVisible;
  //   if (this.isSearchVisible) {
  //     // Optionally, you can focus on the input field when it becomes visible
  //     setTimeout(() => document.querySelector('.search-container input'));
  //   }
  // }
  // filterReset(): void {
  //   this.isSearchVisible = false;
  //   this.searchTerm = '';
  //   this.filteredGroceries = [];
  // }
}

