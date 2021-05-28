import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';

// Menu
export interface Categories {
	path?: string;
	title?: string;
	type?: string;
  active? : boolean
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  public products: Product[] = [];
  public menuItems: Menu[];
  constructor(private router: Router, public navServices: NavService,
    private rest: RestapiService,
    public productService: ProductService
    ) {
    // this.navServices.leftMenuItems.subscribe(menuItems => this.menuItems = menuItems );
    // this.router.events.subscribe((event) => {
    //   this.navServices.mainMenuToggle = false;
    // });
  }

   ngOnInit() {
    this.getProducts()
    //  this.getLeftMenu()
  }
  getProducts(){
    this.productService.getProducts.subscribe(product => {
      this.products = product
      this.getLeftMenu()
    });

  }

   getLeftMenu() {
      const data: any = [...new Set(this.products.map(product => {
        // console.log('product:', product)
        return product.category}))]
        this.menuItems = data
          .map((el: any) => {
            return ({
              title : `${el}`,path : `/shop/collection/left/sidebar?category=${el}`,type : 'sub',active : false
            })
          })
    }

    

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    // item.active = !item.active;
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  onHover(menuItem) {
    if(window.innerWidth > 1200 && menuItem){
       document.getElementById('unset').classList.add('sidebar-unset')
    } else {
      document.getElementById('unset').classList.remove('sidebar-unset')
    }
  }

}
