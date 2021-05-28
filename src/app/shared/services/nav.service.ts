import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor(
		
	) { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;
	menuComp = ['Merchandise', 'fashion', 'electronics' ]


	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}
	
	MENUITEMS: Menu[] = [
		/*{
			title: 'home', type: 'sub', active: false, children: [
				{
					title: 'clothing', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'fashion-01', type: 'link' },
						{ path: '/home/fashion-2', title: 'fashion-02', type: 'link' },
						{ path: '/home/fashion-3', title: 'fashion-03', type: 'link' }
					]
				},
				{ path: '/home/merchandises', title: 'merchandises', type: 'link' },
				{ path: '/home/watch', title: 'watch', type: 'link' },
				{ path: '/home/furniture', title: 'furniture', type: 'link' },
				{ path: '/home/flower', title: 'flower', type: 'link' },
				{ path: '/home/beauty', title: 'beauty', type: 'link' },
				{ path: '/home/electronics', title: 'electronics', type: 'link' },
				{ path: '/home/pets', title: 'pets', type: 'link' },
				{ path: '/home/gym', title: 'gym', type: 'link' },
				{ path: '/home/tools', title: 'tools', type: 'link' },
				{ path: '/home/shoes', title: 'shoes', type: 'link' },
				{ path: '/home/bags', title: 'bags', type: 'link' },
				{ path: '/home/marijuana', title: 'marijuana', type: 'link' }
			]
		},
		{
			title: 'Shop', type: 'sub', active: false, children: [
				{ path: '/shop/collection/left/sidebar', title: 'left-sidebar', type: 'link' },
				{ path: '/shop/collection/right/sidebar', title: 'right-sidebar', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'no-sidebar', type: 'link' }
			]
		},
		{
			title: 'Products', type: 'sub', active: false, children: [
				{
					title: 'sidebar', type: 'sub', active: false, children: [
						{ path: '/shop/product/left/sidebar/trim-dress', title: 'left-sidebar', type: 'link' },
						{ path: '/shop/product/right/sidebar/trim-dress', title: 'right-sidebar', type: 'link' },
						{ path: '/shop/product/no/sidebar/trim-dress', title: 'no-sidebar', type: 'link' }
					]
				},
				{ path: '/shop/product/three/column/trim-dress', title: 'three-column', type: 'link' },
				{ path: '/shop/product/four/image/belted-dress', title: 'four-image', type: 'link' },
				{ path: '/shop/product/bundle/trim-dress', title: 'bundle-product', type: 'link' },
				{ path: '/shop/product/image/outside/trim-dress', title: 'image-outside', type: 'link' }
			]
		}, */
		{
			title: 'Shop', type: 'sub', megaMenu: true, badge: true, badgeText: '20% OFF', active: false, children: [
				{
					title: 'Merch', type: 'sub', active: false, children: [
						{ path: '/home/fashion', title: 'Fashions', type: 'link' },
						{ path: '/home/Stationaries', title: 'Stationaries', type: 'link' },
						{ path: '/home/Accessories', title: 'Accessories', type: 'link' }
						//{ path: '/pages/portfolio/masonry/grid/three', title: 'Gift', type: 'link' },
						//{ path: '/pages/portfolio/masonry/grid/four', title: 'mesonary-grid-4', type: 'link' },
						//{ path: '/pages/portfolio/masonry/full-width', title: 'mesonary-Full-Width', type: 'link' }
					]
				},
				{
					title: 'Fashion', type: 'sub', active: false, children: [
						{ path: '/home/WomenFashions', title: 'Women Fashions', type: 'link' },
						{ path: '/home/MenFashions', title: 'Men Fashions', type: 'link' }
						//{ path: '/home/Unisex', title: 'Unisex', type: 'link' },
						//{ path: '/home/WomenBottom', title: 'Women Bottom', type: 'link' },
						//{ path: '/home/MenBottom', title: 'Men Bottom', type: 'link' }
					]
				},
				{
					title: 'Electronic and Accessories', type: 'sub', active: false, children: [
						{ path: '/home/computer', title: 'Hard Drives', type: 'link' }
						/*{ path: '/elements/theme/collection-banner', title: 'collection-banner', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'home-slider', type: 'link' },
						{ path: '/elements/theme/category', title: 'category', type: 'link' },
						{ path: '/elements/theme/services', title: 'services', type: 'link' } */
					]
				},
				{
					title: 'Health & Beauty', type: 'sub', active: false, children: [
						{ path: '/home/gym', title: 'Personal Care', type: 'link' }
						/*,
						{ path: '/elements/product/banners', title: 'banners', type: 'link' },
						{ path: '/elements/product/tabs', title: 'product-tabs', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' } */
					]
				}
			]
		},
		/*{
			title: 'pages', type: 'sub', active: false, children: [
				{
					title: 'account', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'wishlist', type: 'link' },
						{ path: '/pages/cart', title: 'cart', type: 'link' },
						{ path: '/pages/dashboard', title: 'dashboard', type: 'link' },
						{ path: '/pages/login', title: 'login', type: 'link' },
						{ path: '/pages/register', title: 'register', type: 'link' },
						{ path: '/pages/contact', title: 'contact', type: 'link' },
						{ path: '/pages/forget/password', title: 'forget-password', type: 'link' },
						{ path: '/pages/profile', title: 'profile', type: 'link' },
						{ path: '/pages/checkout', title: 'checkout', type: 'link' },
					]
				},
				{ path: '/pages/aboutus', title: 'about-us', type: 'link' },
				{ path: '/pages/search', title: 'search', type: 'link' },
				{ path: '/pages/typography', title: 'typography', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/review', title: 'review', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/order/success', title: 'order-success', type: 'link' },
					{ 
						title: 'compare', type: 'sub', active: false, children: [
							{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
							{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
						]
					},
				{ path: '/pages/collection', title: 'collection', type: 'link' },
				{ path: '/pages/lookbook', title: 'lookbook', type: 'link' },
				{ path: '/pages/404', title: '404', type: 'link' },
				{ path: '/pages/comingsoon', title: 'coming-soon', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/faq', title: 'faq', type: 'link' }
			]
		}, 
		{
			title: 'blogs', type: 'sub', active: false, children: [
				{ path: '/pages/blog/left/sidebar', title: 'left-sidebar', type: 'link' },
				{ path: '/pages/blog/right/sidebar', title: 'right-sidebar', type: 'link' },
				{ path: '/pages/blog/no/sidebar', title: 'no-sidebar', type: 'link' },
				{ path: '/pages/blog/details', title: 'blog-details', type: 'link' }
			]
		} */
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'Merchandise', type: 'link', active: false,path: '/home/fashion'
			// children: [
					// { path: '/home/fashion', title: 'Fashions', type: 'link' },
					// { path: '/home/Stationaries', title: 'Stationaries', type: 'link' },
					// { path: '/home/Accessories', title: 'Accessories', type: 'link' }

			// ]
		},
		{
			title: 'Fashion', type: 'sub', active: false
			// children: [
				// { path: '/home/WomenFashions', title: 'Women Fashions', type: 'link' },
				// { path: '/home/MenFashions', title: 'Men Fashions', type: 'link' }
				//{ path: '/home/Unisex', title: 'Unisex', type: 'link' },
				//{ path: '/home/WomenBottom', title: 'Women Bottom', type: 'link' },
				//{ path: '/home/MenBottom', title: 'Men Bottom', type: 'link' }
			// ]
		},
		{
			title: 'Electronic and Accessories', type: 'sub', active: false, 
			// children: [
				// { path: '/home/computer', title: 'Hard Drives', type: 'link' }
				/*{ path: '/elements/theme/collection-banner', title: 'collection-banner', type: 'link' },
				{ path: '/elements/theme/home-slider', title: 'home-slider', type: 'link' },
				{ path: '/elements/theme/category', title: 'category', type: 'link' },
				{ path: '/elements/theme/services', title: 'services', type: 'link' } */
			// ]
		},
		{
			title: 'Health & Beauty', type: 'sub', active: false, 
			// children: [
				// { path: '/home/gym', title: 'Personal Care', type: 'link' }
				/*,
				{ path: '/elements/product/banners', title: 'banners', type: 'link' },
				{ path: '/elements/product/tabs', title: 'product-tabs', type: 'link' },
				{ path: '/elements/product/multi-slider', title: 'multi-slider', type: 'link' } */
			// ]
		},
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
