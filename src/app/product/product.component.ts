import { Component, inject, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productdisplay } from '../productdisplay';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { ProductService } from '../product.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
selector: 'app-product',
standalone: true,
imports: [CommonModule,
ProductDisplayComponent,
RouterModule],
template: `
<section class ="header" >
  <div class="inserter">
    <button title = "Add" type="submit" class="primary" (click) = "getAdd()"  > Add Product </button>
  </div>
      <form>
      <input class ="text-box " type="text" placeholder="Find Product by code" title = "Find product" #filterInput>

        <i class="fas fa-search " type ="button"(click)="filterResults(filterInput.value)"></i>
        <button *ngIf="searchClicked && searchValue" (click)="resetResults()">Reset</button>
        <div class="no-results">
              <p *ngIf="noResults">No products found with the code that you have typed found</p> <br>
          <p *ngIf="noResults">Please check and do it again</p>
        </div>
      </form>
  </section>
  <section >
    <div class ="results" >
    <app-product-display *ngFor ="let productDisplay of displayedProducts"
    [productDisplay] = "productDisplay" ></app-product-display>
    </div>
    <div class="button-container">
      <button class = "less" *ngIf="hasLessProducts"(click)="showLess()">Show Less</button>
      <button class = "more" *ngIf="hasMoreProducts && !searchClicked" (click)="loadMore()">Load More</button>
    </div>
  </section>
`,
styleUrls: ['./product.component.css']
})
export class ProductComponent {
  resetValue = false;
  searchValue = '';
  filteredProduct : Productdisplay[] = [];
  productDisplayList:Productdisplay[]=[];
  displayedProducts:Productdisplay[]=[];
  noResults = false;
  productService:ProductService = inject(ProductService);
  searchClicked = false;
  @ViewChild('filterInput') filterInput!: ElementRef;
  constructor(private router: Router) {
    this.productService.getAllProducts().then((productDisplayList: Productdisplay[]) => {
    this.productDisplayList = productDisplayList;
    this.filteredProduct = this.productDisplayList;
    this.displayedProducts = this.productDisplayList.slice(0,4);
  });
  }
filterResults(text: string) {
  if (text) {
    this.filteredProduct = this.productDisplayList.filter(product => product?.code.toUpperCase().includes(text.toUpperCase()));
    this.searchValue = text;
    this.displayedProducts = this.filteredProduct.slice(0,4);
    this.searchClicked = true;
    this.noResults = this.filteredProduct.length === 0;
  } 
  else {
    this.filteredProduct = this.productDisplayList;
    this.displayedProducts = this.productDisplayList.slice(0,4);
    this.searchClicked = false;
  }
}
resetResults() {
  this.displayedProducts = this.productDisplayList.slice(0,4);
  this.searchClicked = false;
  this.noResults = false;
  this.filterInput.nativeElement.value = '';
}
get hasMoreProducts() {
  return this.productDisplayList.length > this.displayedProducts.length;
}
get hasLessProducts() {
  return this.displayedProducts.length > 4;
}
loadMore() {
  const currentLength = this.displayedProducts.length;
  const newLength = currentLength + 2;
  this.displayedProducts = this.productDisplayList.slice(0,newLength);
}
  showLess() {
    const currentLength = this.displayedProducts.length;
    if (currentLength%2 != 0){const newLength = currentLength - 1;this.displayedProducts = this.productDisplayList.slice(0,newLength);}
    else {
      const newLength = currentLength - 2;
      this.displayedProducts = this.productDisplayList.slice(0,newLength);
    }
  }
  getAdd(){
    this.router.navigate(['/add']);
  }

}