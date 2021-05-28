import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { RestapiService } from '../../../restapi.service';


@Component({
  selector: 'app-fashion-three',
  templateUrl: './fashion-three.component.html',
  styleUrls: ['./fashion-three.component.scss']
})
export class FashionThreeComponent implements OnInit, OnDestroy {

  public products : Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService,
    private rest: RestapiService
    ) {
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

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'welcome to fashion',
    subTitle: 'Men fashion',
    image: 'assets/images/slider/5.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'Women fashion',
    image: 'assets/images/slider/6.jpg'
  }];

  
  async ngOnInit() {
    document.body.classList.add('box-layout-body');
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

  ngOnDestroy() {
  	document.body.classList.remove('box-layout-body');
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
