import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from '../../core/services/data.service';

@Component({
  selector: 'app-country-card',
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-3">
        <img
          [src]="country().flags.png"
          [alt]="country().name.common"
          class="w-10 h-7 object-cover rounded"
        />
        <h3 class="font-semibold text-gray-900 text-sm">{{ country().name.common }}</h3>
      </div>
      <div class="text-sm text-gray-600 space-y-1">
        <p><span class="text-gray-500">Capital:</span> {{ capitalName() }}</p>
        <p><span class="text-gray-500">Population:</span> {{ formattedPopulation() }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCardComponent {
  country = input.required<Country>();

  capitalName(): string {
    return this.country().capital?.[0] ?? 'N/A';
  }

  formattedPopulation(): string {
    return this.country().population.toLocaleString();
  }
}
