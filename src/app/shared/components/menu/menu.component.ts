import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { Router } from '@angular/router';
import { RestapiService } from '../../../restapi.service';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // public menuItems = [ ]
  public products: Product[] = [];
  public menuItems = [{ title: 'Shop', type: 'sub', megaMenu: true, badge: true, badgeText: '20% OFF', active: false, children: [] }]
  public menuComp = ['stationaries', 'fashion', 'electronics', "flower"]
  constructor(private router: Router, public navServices: NavService,
    private rest: RestapiService,
    public productService: ProductService
  ) {
    // this.navServices.items.subscribe(menuItems => this.menuItems = menuItems );
    // this.router.events.subscribe((event) => {
    //   this.navServices.mainMenuToggle = false;
    // });
  }

  ngOnInit(): void {
    this.productService.getProducts.subscribe(product => {
      this.products = product
      this.getTopMenu()
    });
    
  }

  getTopMenu() {
    try {
      const data: any = [...new Set(this.products.map(product => product.category))]
        let c = data.reduce((a, el) => {
              a[el] = {title : `${el}`,path : `/shop/collection/left/sidebar?category=${el}`,type : 'sub',active : false}
          
          return a
        }, {})
        this.menuItems[0].children = Object.values(c)
    } catch (error) {
    }
  }



  mainMenuToggle(): void {
    this.navServices.mainMenuToggle = !this.navServices.mainMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item) {
    item.active = !item.active;
  }

}
