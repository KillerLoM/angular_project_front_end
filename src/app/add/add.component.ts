  import { Component, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ActivatedRoute } from '@angular/router';
  import { ProductService } from '../product.service';
  import { Productdisplay } from '../productdisplay';
  import {FormControl, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
  import { Router } from '@angular/router';
  @Component({
    selector: 'app-add',
    standalone: true,
    imports: [CommonModule,
      ReactiveFormsModule],
    template: `
    <section  class="lising-apply" *ngIf="showForm">
    <h2 display = "none" class="section-heading">Enter information about this product</h2>
    <form [formGroup]="applyForm" (submit)="sendProduct()">
        <label for="code">Code</label>
        <input type="text" formControlName="code" id="code" placeholder="Enter code">
        
        <div class = "error" *ngIf="applyForm.get('code')?.invalid && applyForm.get('code')?.touched">
          * Code is required
        </div>
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

    </section>
    <section *ngIf="showDialog1">
    <div class = "dialog_modal" >
      <div class = "dialog_overlay"></div>   
      <div class="dialog" >
          <h2>Do you want to add more product ?</h2>
        <div class="dialog-buttons">
            <button type="submit" class="primary" (click)="addMore()">Yes</button>
            <button type="submit" class="primary" (click)="back()">No</button>
        </div>
      </div>
    </div>
    </section>
    `,
    styleUrls: ['./add.component.css']
  })
  export class AddComponent {
    urladd = 'http://localhost:8080/save/products';
    showDialog = false;
    showDialog1 = false;
    showForm = true;
    route: ActivatedRoute = inject(ActivatedRoute);
    constructor(private productService: ProductService, private router: Router){}
    applyForm = new FormGroup({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    });
    sendProduct() {
      this.showDialog = true;
    }
    async check(code: string){
  
      const existingProduct = await this.productService.getProductByCode(code);
      if (existingProduct) {
        this.showDialog = false;
        this.showDialog1 = true;
        this.applyForm.reset();
        this.showDialog = false;
        this.showForm = false;
        alert(`Can't create product with the code: ${code}`);
        return 0;
      } else {
        return 1;
      }
    }
    
    async confirmSend() {
      
      // Logic to send the form
      var productData = {
        code: this.applyForm.value.code,
        name: this.applyForm.value.name,
        description: this.applyForm.value.description,
        category: this.applyForm.value.category,
        brand: this.applyForm.value.brand,
        type: this.applyForm.value.type
      };
      if (productData.code){
        const codeExists = await this.check(productData.code);
      if (codeExists === 0) {
        this.showDialog1 = true;
        return;
        }
      }
      
      fetch(`${this.urladd}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      this.showDialog1 = true;
      this.applyForm.reset();
      this.showDialog = false;
      this.showForm = false;
    }
    cancelSend() {
      this.applyForm.reset();
      this.showDialog = false;
    }
    addMore(){
      this.showForm = true;
      this.showDialog1 = false;
    }
    back() {
      this.router.navigate(['/']);
    }
  }
