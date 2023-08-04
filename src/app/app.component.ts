import { Component } from '@angular/core';
import { ProductComponent } from './product/product.component';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ProductComponent,
    RouterLink,
    RouterOutlet,
  ],
  template: `
  <main>
  <header class="brand-name" title="Home page" style="pointer-events: none;">
  <a [routerLink]="['/']">
    <img
      class="brand-logo"
      src="/assets/25694.png"
      alt="logo"
      aria-hidden="true"
      style="pointer-events: auto; width: 60px; height: 60px;"
    />
  </a>

</header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HOME';
}
