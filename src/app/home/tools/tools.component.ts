import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeSlider, ProductSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit, OnDestroy {

  public themeLogo: string = 'assets/images/icon/logo-5.png';
  
  public products: Product[] = [];
  public productCollections: any[] = [];

  constructor(private _sanitizer:DomSanitizer,
    public productService: ProductService) {
    this.productService.getProducts.subscribe(response => {
      this.products = response.filter(item => item.type == 'computer');
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
  public ProductSliderConfig: any = ProductSlider;

  // services
  public categories = [{
    image: 'assets/images/categories/speaker2.png',
    title: 'Speakers',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Sony</a></li><li><a href="#">Portable Bluetooth</a></li><li><a href="#">Wired High-5 Speaker</a></li><li><a href="#">Wireless Speaker</a></li>'),
  }, {
    image: 'assets/images/categories/mouse2.png',
    title: 'Mouses',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Wireless Mouse</a></li><li><a href="#">Wired Mouse</a></li><li><a href="#">Bluetooth Mouse</a></li><li><a href="#">Gaming Mouse</a></li>'),
  }, {
    image: 'assets/images/categories/keyboard2.png',
    title: 'Keyboards',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Wireless Keyboard</a></li><li><a href="#">Wired Keyboard</a></li><li><a href="#">Bluetooth Keyboard</a></li><li><a href="#">Smart Keyboard</a></li>'),
  }, {
    image: 'assets/images/categories/mac.png',
    title: 'Monitor',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Shock-resistant parts</a></li><li><a href="#">Skeleton parts</a></li><li><a href="#">Slow parts</a></li><li><a href="#">Solar-powered parts</a></li>'),
  }, {
    image: 'assets/images/categories/10.jpg',
    title: 'other parts',
    text:  this._sanitizer.bypassSecurityTrustHtml('<li><a href="#">Mac Monitors</a></li><li><a href="#">Windows Monitor</a></li><li><a href="#">LED Monitor</a></li><li><a href="#">OLED Monitor</a></li>'),
  }]

  ngOnInit(): void {
    // Add class in body
    document.body.classList.add("tools-bg");
  }

  ngOnDestroy(): void {
    // Remove class in body
    document.body.classList.remove("tools-bg");
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
