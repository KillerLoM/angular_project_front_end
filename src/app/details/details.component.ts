import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Productdisplay } from '../productdisplay';
import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { Router , NavigationExtras } from '@angular/router';
interface DetailsExtras extends NavigationExtras {
  reload: boolean;
}
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  template: `
  <article>
  
  <section class="listing-description">
  <h2 class="listing-heading">
    <span>{{productDisplay?.name}}</span>
  </h2>
  </section>
  <section class="listing-features">
    <h2 class="section-heading" title="Code's product">{{productDisplay?.code}}</h2>
    <h3 class="listing-description" title = "Description of product" >{{productDisplay?.description}}</h3>
    <table class="table" style="margin: 0 auto;">
    <thead>
      <tr>
        <th>Category</th>
        <th>Brand</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{productDisplay?.category}}</td>
        <td>{{productDisplay?.brand}}</td>
        <td>{{productDisplay?.type}}</td>
      </tr>
    </tbody>
  </table>
  <hr>
  </section>
  <section>
    <button title = "Edit" type="submit" class="primary" (click) = "editProduct()" *ngIf="!showForm" > Edit Product </button>
    <button title = "Delete" type="submit" class="primary"  (click)="deleteProduct()" *ngIf="!showForm"> Delete Product </button>
  </section>
  <section  class="lising-apply" *ngIf="showForm">
    <h2 display = "none" class="section-heading">Enter information about this product</h2>
    <form [formGroup]="applyForm" (submit)="sendProduct()">

        <label for="name">Name</label>
        <input type="text" formControlName="name" id="name" placeholder="Enter name">

        <div class = "error" *ngIf="applyForm.get('name')?.invalid && applyForm.get('name')?.touched">
          * Name is required
        </div>
        <label for="description">Description</label>
        <input type="text" formControlName="description" id="description" placeholder="Enter description">
        <div class = "error" *ngIf="applyForm.get('description')?.invalid && applyForm.get('description')?.touched">
          * Description is required
        </div>
        <label for="category">Category</label>
        <input type="text" formControlName="category" id="category" placeholder="Enter category">
        <div class = "error" *ngIf="applyForm.get('category')?.invalid && applyForm.get('category')?.touched">
          * Category is required
        </div>        
        <label for="brand">Brand</label>
        <input type="text" formControlName="brand" id="brand" placeholder="Enter brand">
        <div class = "error" *ngIf="applyForm.get('brand')?.invalid && applyForm.get('brand')?.touched">
          * Brand is required
        </div>        
        <label for="type">Type</label>
        <input type="text" formControlName="type" id="type" placeholder="Enter type">
        <div class = "error" *ngIf="applyForm.get('type')?.invalid && applyForm.get('type')?.touched">
          * Type is required
        </div>
        <button type="submit" class="primary" [disabled]="!applyForm.valid">send</button>

        </form>
    </section>
    <section *ngIf="showDialog">
    <div class = "dialog_modal" >
      <div class = "dialog_overlay"></div>   
      <div class="dialog" >
          <h2>Are you sure you want to send the form?</h2>
        <div class="dialog-buttons">
            <button type="submit" class="primary" (click)="confirmSend()">OK</button>
            <button type="submit" class="primary" (click)="cancelSend()">Cancel</button>
        </div>
      </div>
    </div>
    </section>
    <section *ngIf="showDialogDelete">
    <div class="dialog_modal">
      <div class="dialog_overlay"></div>
      <div class="dialog1">
        <div class="dialog1_content">
          <h2 class="dialog1_content" style="font-size: large; font-weight: bold; color: red">Are you sure you want to delete product with code: {{productDisplay?.code}}?</h2>
          <span style="font-style: italic; color: red">Once data has been deleted that will not be recovery again</span>
          <div class="dialog-buttons">
            <button type="submit" class="primary" (click)="confirmDelete()">OK</button>
            <button type="submit" class="primary" (click)="cancelDelete()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</article>

  `,
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  
  url = 'http://localhost:8080/update/products';
  urldelete = 'http://localhost:8080/delete/products'
  showDialog = false;
  showDialogDelete = false;
  editValue = false
  showForm = false;
  submitted: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  productService= inject(ProductService);
  productDisplay: Productdisplay | undefined ;
  applyForm = new FormGroup({

    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });
  
  constructor(private router: Router){

    const productDisplayCode = this.route.snapshot.params['code'];
    this.productService.getProductByCode(productDisplayCode).then
    (productDisplay=>{
        this.productDisplay = productDisplay;
      });
  }
  editProduct(){
    this.showForm = true;
  }

  sendProduct() {
    this.showDialog = true;
  }
  
 
confirmSend() {

  const productData = {
    code: this.route.snapshot.params['code'],
    name: this.applyForm.value.name,
    description: this.applyForm.value.description,
    category: this.applyForm.value.category,
    brand: this.applyForm.value.brand,
    type: this.applyForm.value.type
  };
  fetch(`${this.url}/${productData.code}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });

  this.applyForm.reset();
  this.showDialog = false;
  this.showForm = false;

  document.location.reload();
}
  cancelSend() {
    this.applyForm.reset();
    this.showDialog = false;
    this.showForm = false;
  }
  
  deleteProduct() {
    this.showDialogDelete = true;}
  confirmDelete(){  
    const productDisplayCode = this.route.snapshot.params['code'];
    fetch(`${this.urldelete}/${productDisplayCode}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.submitted = true;
          alert('Deleted ');
          this.router.navigate(['/']);
        } else {
          alert('An error occurred');
        }
      });
  }
  cancelDelete(){
    this.showDialogDelete = false;
  }
}
