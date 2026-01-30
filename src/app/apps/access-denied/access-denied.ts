import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-access-denied',
  template: `
    <div class="min-h-screen flex items-center justify-center p-8">
      <div class="text-center max-w-md">
        <div
          class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
        <p class="text-gray-500 mb-8">
          You need to select a role before accessing this page. Please choose your role to continue.
        </p>

        <p-button label="Select a Role" routerLink="/" severity="primary" size="large" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button],
})
export class AccessDeniedComponent {}
