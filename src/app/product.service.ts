import { Injectable } from '@angular/core';
import { Productdisplay } from './productdisplay';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8080/get/products';
  async getAllProducts(): Promise<Productdisplay[]> {
    const data = await fetch(this.url);
    return await data.json() ??[];
  }
  
  async getProductByCode(code: String): Promise<Productdisplay | undefined> {
    const data = await fetch(`${this.url}/${code}`);
    return await data.json()??{};
  }
  
  sendProduct(name: String, description: String, category: String, brand: String, type: String){
    console.log(`The data has been sent: 
 
      name: ${name} 
      description: ${description}
      category: ${category}
      brand: ${brand}
      type: ${type}`)
  }
}