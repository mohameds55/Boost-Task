import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
      {{ message() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  message = input.required<string>();
}
