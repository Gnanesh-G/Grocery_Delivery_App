import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { UserDetail } from 'src/app/model/user-detail';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

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
  profileDetails: Profile[] = [];
  userDetails: UserDetail[] = [];

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = this.storageService.getLoggedInUser().username;
    this.name = this.storageService.getLoggedInUser().name;
    this.role = this.storageService.getLoggedInUser().role;

    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    //console.log(userId);

    this.profileService.getAddress(userId).subscribe({
      next: (profileDetails: any) => {
        let newProfile: Profile[] = profileDetails.data.addressList;
        this.profileDetails = newProfile;
        //console.log(profileDetails);
      },
    });
  }

  onSubmit() {}
}
