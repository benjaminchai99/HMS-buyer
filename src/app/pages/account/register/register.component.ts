import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private rest: RestapiService,
    private data: DataService,
    ) { }
  registrationForm: FormGroup;
  isSubmitted  =  false;
  States:any = ["Federal Territory of Kuala Lumpur", "Federal Territory of Labuan",
    "Federal Territory of Putrajaya","Johor","Kedah","Kelantan","Malacca",
    "Negeri Sembilan","Pahang","Perak","Perlis","Penang","Sabah","Sarawak","Selangor","Terengganu"]
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['', [Validators.required, Validators.min(5)] ],
      userType: ["Buyer", Validators.required ],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      phoneNo: ['',Validators.required],
      postalCode: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: [null, [Validators.required, Validators.min(1)]]
    });
  }
  
  get formControls() { return this.registrationForm.controls; }
  changeState(e){
    console.log('e:', e.target.value)
    this.formControls.state.setValue(e.target.value, {
      onlySelf: true
    })
  }
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
        return {invalid: true};
    }
}
  async register(){
    try {
    this.isSubmitted = true;
    if(this.registrationForm.invalid){
      return;
    }
    const data = await this.rest.post(
      '/accounts/signup',
      this.registrationForm.value);
      if (data['success']) {
        localStorage.setItem('token', data['token']);
        this.data.success('Registration successful!');
        this.router.navigate(['/home/fashion']);
      } else {
        this.data.error(data['message']);
      }  
    } catch (error) {
      console.log('error:', error)
      
    }
    
  }

  

}
