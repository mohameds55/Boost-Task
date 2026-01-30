import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../core/services/data.service';

@Component({
  selector: 'app-product-card',
  template: `
    <div
      class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div class="h-40 bg-gray-50 flex items-center justify-center p-4">
        <img
          [src]="product().image"
          [alt]="product().title"
          class="max-h-full max-w-full object-contain"
        />
      </div>
      <div class="p-4">
        <p class="text-xs text-gray-500 uppercase mb-1">{{ product().category }}</p>
        <h3 class="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{{ product().title }}</h3>
        <p class="text-blue-600 font-bold">\${{ product().price }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
