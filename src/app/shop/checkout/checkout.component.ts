import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from "../../shared/classes/product";
import { ProductService } from "../../shared/services/product.service";
import { OrderService } from "../../shared/services/order.service";
import { RestapiService } from '../../restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public products:any = [];
  public payPalConfig ? : IPayPalConfig;
  public payment: string = "iPay88";
  public amount:  any;
  public powers = []
  public courier = "select a shipping method"
  constructor(private router: Router, private fb: FormBuilder,
    public productService: ProductService,
    private orderService: OrderService,
    private rest: RestapiService) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.products = response);
    this.getTotal.subscribe(amount => this.amount = amount);
    this.getShipments();
    this.initConfig();
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }
  public getShipments(){
    this.rest.getS('shipment').subscribe((res:any) => 
      {
        let ship:[any]  = res.shipmentDetails
        ship.map((e,i) => {
          if(e.userName == this.products[0].sellerName)
            this.powers.push( e.name)
        })
      })
  }

  // Stripe Payment Gateway
  stripeCheckout() {
    this.products.forEach((e:any)=>{
      let obj:any= {}
      obj.productId = e.productId 
      obj.productName = e.productName
      obj.quantity = e.quantity
      obj.sellerUserName = e.sellerName
      obj.amountPaid = e.price * e.quantity
      obj.paymentMethod = this.payment
      obj.courier = this.courier
      this.rest.postS('order',obj).subscribe(res => {
        console.log('res:', res)
        this.orderService.createOrder(this.products, this.checkoutForm.value, "token.id", this.amount);
        this.router.navigate(['/shop/fashion']);
      })
    })
    
    
    
    // var handler = (<any>window).StripeCheckout.configure({
    //   key: environment.stripe_token, // publishble key
    //   locale: 'auto',
    //   token: (token: any) => {
    //     // You can access the token ID with `token.id`.
    //     // Get the token ID to your server-side code for use.
    //     this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
    //   }
    // });
    // handler.open({
    //   name: 'Multikart',
    //   description: 'Online Fashion Store',
    //   amount: this.amount * 100
    // }) 
  }
  
  // Stripe Payment Gateway
  stripeCheckout1() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        //this.orderService.createOrder(this.products, this.checkoutForm.value, token.id, this.amount);
      }
    });
    handler.open({
      name: 'HELP Merchandize Store',
      description: 'Online Retail Site',
      amount: this.amount * 100
    }) 
    this.products.forEach((e:any)=>{
      let obj:any= {}
      obj.productId = e.productId 
      obj.productName = e.productName
      obj.quantity = e.quantity
      obj.sellerUserName = e.sellerName
      obj.amountPaid = e.price * e.quantity
      obj.paymentMethod = this.payment
      obj.courier = this.courier
      this.rest.postS('order',obj).subscribe(res => {
        console.log('res:', res)
        this.orderService.createOrder(this.products, this.checkoutForm.value, "token.id", this.amount);
      })
    })
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
        currency: this.productService.Currency.currency,
        clientId: environment.paypal_token,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                currency_code: this.productService.Currency.currency,
                value: this.amount,
                breakdown: {
                    item_total: {
                        currency_code: this.productService.Currency.currency,
                        value: this.amount
                    }
                }
              }
          }]
      },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            size:  'small', // small | medium | large | responsive
            shape: 'rect', // pill | rect
        },
        onApprove: (data, actions) => {
            this.orderService.createOrder(this.products, this.checkoutForm.value, data.orderID, this.getTotal);
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }


}
