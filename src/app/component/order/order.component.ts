import { Component } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Profile } from 'src/app/model/profile';
import { OrderService } from 'src/app/service/order.service';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  error: string = "";
  orders:Order[]=[];
  userId = this.storageService.getLoggedInUser().id;
  profileDetails: Profile[] = [];

  constructor(private orderService: OrderService,private storageService:StorageService,
    private profileService: ProfileService) {}

  ngOnInit(userId:number): void {
    this.orderService.getUsersOrder(this.userId).subscribe({
      next: (response: any) => {
        this.orders = response.data;
      },
      
    });

    this.profileService.getAddress(this.userId).subscribe({
      next: (response: any) => {
        this.profileDetails = response.data.addressList;
      },
    });

  }
  
}
