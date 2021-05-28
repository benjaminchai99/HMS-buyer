import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { ProductSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { RestapiService } from '../../../restapi.service';
import { DataService } from '../../../data.service';



@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {

  public products: Product[] = [];
  public productCollections: any[] = [];

  constructor(public productService: ProductService,
    private rest: RestapiService,
    private data: DataService

  ) {
    
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = []

  getProducts(){
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'fashion');
      // Get Product Collection
      // this.products.filter((item) => {
      //   item.collection.filter((collection) => {
      //     const index = this.productCollections.indexOf(collection);
      //     if (index === -1) this.productCollections.push(collection);
      //   })
      // })
    });
  }

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/Men1.png',
    save: 'save 20%',
    title: 'men'
  }, {
    image: 'assets/images/collection/fashion/Women1.png',
    save: 'save 20%',
    title: 'women'
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

   ngOnInit() {
    this.getCampaigns()
    this.getProducts()
  }
  getCampaigns() {
    this.rest.getS('campaigns').subscribe((res: any) => {
      const data = res.campaigns
        .map(i => {
          return ({
            image: i.image,
            subTitle: i.name
          })
        })
        this.sliders = data
    },
      (err: any) => {
        this.data.error(err['message']);
      }
    )

  }
 
  // async getCampaigns() {
  //   try {
  //     const data: any = await this.rest.get('/campaigns');
  //     if (data['success']) {
  //       console.log('data:', data.campaigns.length)
  //       this.sliders = data.campaigns
  //         .map(i => {
  //           console.log('i::::', i.name)
  //           return({
  //             image : i.image,
  //             subTitle : i.name

  //           })
  //         })
  //         console.log('sliders:', this.sliders)
  //     }
  //     else {
  //       console.log('data:err', data)

  //     }
  //   } catch (error) {
  //   }
  // }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }

}
