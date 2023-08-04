import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import {AddComponent } from './add/add.component';
const routeConfig: Routes = [{
    path: '',
    component: ProductComponent,
    title: 'Home',
},
{
    path: 'details/:code',
    component: DetailsComponent,
    title: 'Details page',
},
{
    path: 'add',
    component: AddComponent,
    title: 'Add page',
}

];
export default routeConfig;