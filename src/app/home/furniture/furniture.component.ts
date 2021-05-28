import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class MenFashionComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/icon/logo-12.png'; // Change Logo

  public products: Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'men-fashion');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public sliders = [{
    title: 'HELP Merchandise Store Launch Sale',
    subTitle: 'Men Fashions',
    image: 'assets/images/slider/manfashion1.png'
  }, {
    title: 'Be someone fancy',
    subTitle: 'MENS',
    image: 'assets/images/slider/manfashion2.png'
  }];

// Collection banner
  public collections1 = [{
    image: 'assets/images/collection/fashion/manfashion3.png',
    save: 'save 30%',
    title: 'Korean'
  }, {
    image: 'assets/images/collection/fashion/manfashion4.png',
    save: 'save 50%',
    title: 'American'
  }];
  

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
   
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
