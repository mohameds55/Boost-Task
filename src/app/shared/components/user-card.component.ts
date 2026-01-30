import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { User } from '../../core/services/data.service';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span class="text-blue-600 font-semibold">{{ user().name.charAt(0) }}</span>
        </div>
        <div>
          <h3 class="font-semibold text-gray-900">{{ user().name }}</h3>
          <p class="text-sm text-gray-500">{{ user().email }}</p>
        </div>
      </div>
      <p class="text-sm text-gray-600">{{ user().company.name }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  user = input.required<User>();
}
