import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { RestapiService } from '../../../restapi.service';
import { FormBuilder,FormGroup,AbstractControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private data: DataService,
    private rest: RestapiService,
    private formBuilder: FormBuilder,
  ) { }

  profileData: FormGroup;
  isSubmitted  =  false;
  States:any = ["Federal Territory of Kuala Lumpur", "Federal Territory of Labuan",
    "Federal Territory of Putrajaya","Johor","Kedah","Kelantan","Malacca",
    "Negeri Sembilan","Pahang","Perak","Perlis","Penang","Sabah","Sarawak","Selangor","Terengganu"]
    async ngOnInit() {
      try {
        this.profileData = this.formBuilder.group({
          email: ['', [ Validators.required, Validators.email ]],
          phoneNo: ['',Validators.required],
          postalCode: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state: [null, [Validators.required, Validators.min(1)]]
        });
        if (!this.data.user) {
          await this.data.getProfile();
        }
        const {email, phoneNo, postalCode, address,city, state} = this.data.user
        this.profileData.patchValue({
          email, phoneNo, postalCode, address,city, state
        })
      } catch (error) {
        this.data.error(error);
      }
    }
  
    get formControls() { return this.profileData.controls; }
   
  changeState(e){
    this.formControls.state.setValue(e.target.value, {
      onlySelf: true
    })
  }
 
  async update() {
    try {
      if(this.profileData.invalid){
        return;
      }
        const data = await this.rest.post(
          '/accounts/profile',
          this.profileData.value
        );

        data['success']
          ? (this.data.getProfile(), this.data.success(data['message']))
          : this.data.error(data['message']);
      }
    catch (error) {
      this.data.error(error['message']);
    }
  }


}
