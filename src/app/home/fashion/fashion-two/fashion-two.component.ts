import { Component, OnInit } from '@angular/core';
import { HomeSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { RestapiService } from '../../../restapi.service';


@Component({
  selector: 'app-fashion-two',
  templateUrl: './fashion-two.component.html',
  styleUrls: ['./fashion-two.component.scss']
})
export class FashionTwoComponent implements OnInit {
  
  public themeLogo: string = 'assets/images/icon/logo-5.png'; // Change Logo

  public products : Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService,
    private rest: RestapiService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'stationaries');
      // Get Product Collection
      this.products.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public HomeSliderConfig: any = HomeSlider;

  public sliders = [{
    title: 'HELP Merchandise Store Launch Sale',
    subTitle: '20% OFF',
    image: 'assets/images/slider/stationaries.png'
  }, {
    title: 'Get all HELP Merchandise Stationaries',
    subTitle: '5 + item',
    image: 'assets/images/slider/stationaries2.jpg'
  },{
    title: 'Get all HELP Merchandise Stationaries',
    subTitle: '20% OFF',
    image: 'assets/images/collection/fashion/all.png'
  }]

  // Collection banner
  public collections1 = [{
    image: 'assets/images/collection/fashion/pen.png',
    save: 'save 20%',
    title: 'Pens'
  }, {
    image: 'assets/images/collection/fashion/notebook2.png',
    save: 'save 20%',
    title: 'Notebooks' 
  }];

  public collections2 = [{
    image: 'assets/images/collection/fashion/case.png',
    save: 'save 20%',
    title: 'Case'
  }, {
    image: 'assets/images/collection/fashion/file.png',
    save: 'save 20%',
    title: 'File'
  }];

  async ngOnInit() {
  }

  async getCampaigns() {
    try {
      const data: any = await this.rest.get('/campaigns');
      if (data['success']) {
        // let c = await data.categories.reduce((a, el) => {
        //   if (this.menuComp.includes(el.name) && el.status == "A") {
        //       a[el.name] = {title : `${el.name}`,path : `/home/${el.name}`,type : 'sub',active : false}
        //   }
        //   return a
        // }, {})
        // this.menuItems[0].children = Object.values(c)
      }
      else {
        console.log('data:err', data)

      }
    } catch (error) {
    }
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
