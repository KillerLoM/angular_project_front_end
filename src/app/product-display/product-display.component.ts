import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Productdisplay} from '../productdisplay'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [CommonModule,
  RouterModule],
  template: `
  <section class="listing">
    <h2 class="listing-heading">{{productDisplay.name}}</h2>
    <p class="listing-description">{{productDisplay.description}}</p>
    <a [routerLink]="['/details', productDisplay.code]">Learn more</a>
    
  </section>
  `,
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() productDisplay!: Productdisplay;
  
}