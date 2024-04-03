import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { UserDetail } from 'src/app/model/user-detail';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: String = '';
  name: String = '';
  role: String = '';
  error: string = '';
  address: string = '';
  city: string = '';
  pinCode: string = '';
  profileDetails: Profile[] = [];
  userDetails: UserDetail[] = [];
  userId = this.storageService.getLoggedInUser().id;

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.username = this.storageService.getLoggedInUser().username;
    this.name = this.storageService.getLoggedInUser().name;
    this.role = this.storageService.getLoggedInUser().role;

    this.profileService.getAddress(this.userId).subscribe({
      next: (response: any) => {
        this.profileDetails = response.data.addressList;
      },
    });
  }

  onSubmit(details: { address: string; city: string; pinCode: number }) {
    this.profileService
      .postAddress(details, this.storageService.getLoggedInUser().id)
      .subscribe({
        next: (response:any) => {
          console.log(response.data, 'Gnanesh');
          this.profileDetails = response.data.addressList;
          this.address = '';
          this.city = '';
          this.pinCode = '';
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
      this.ngOnInit();
  }

  delete(id: number): void {
    this.profileService.deleteAddress(id).subscribe({
      next: () => {
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
