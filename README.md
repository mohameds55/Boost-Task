# Boost Dashboard

A role-based Angular dashboard application demonstrating best practices with Angular signals, PrimeNG components, Tailwind CSS, and route guards.

## Features

- **Role-based access control** with Angular route guards
- **Dynamic data fetching** from public APIs based on selected role
- **Signal-based state management** using Angular's reactive signals
- **Custom structural directives** for conditional rendering
- **Reusable components** with input signals
- **PrimeNG UI components** with Lara theme
- **Tailwind CSS** for responsive styling

## Tech Stack

- Angular 20+ (Standalone components, Signals, Zoneless)
- PrimeNG 20+ with Lara theme
- Tailwind CSS 4
- TypeScript (Strict mode)

## Project Structure

```
src/app/
├── apps/
│   ├── role-selection/      # Role selection page
│   ├── data/                # Protected data dashboard
│   ├── access-denied/       # Access denied page
│   └── home/                # Home page
├── core/
│   ├── guards/
│   │   └── role.guard.ts    # Route guard for role protection
│   └── services/
│       ├── role.service.ts  # Role state management
│       └── data.service.ts  # API data fetching
└── shared/
    ├── components/
    │   ├── user-card.component.ts
    │   ├── post-card.component.ts
    │   ├── product-card.component.ts
    │   ├── country-card.component.ts
    │   ├── loading-spinner.component.ts
    │   └── error-message.component.ts
    ├── directives/
    │   └── show-when.directive.ts   # Custom structural directive
    └── pipes/
        └── text-transform.pipe.ts   # Text transformation pipe
```

## Roles & API Endpoints

| Role | API Endpoint | Data Type |
|------|--------------|-----------|
| Admin | `jsonplaceholder.typicode.com/users` | User profiles |
| Instructor | `jsonplaceholder.typicode.com/posts` | Blog posts |
| User | `fakestoreapi.com/products` | Products |
| Manager | `restcountries.com/v3.1/all` | Countries |

## Routes

| Path | Component | Protected |
|------|-----------|-----------|
| `/` | RoleSelectionComponent | No |
| `/data` | DataComponent | Yes (requires role) |
| `/access-denied` | AccessDeniedComponent | No |

## Key Patterns

### Signal-based State Management

```typescript
// RoleService
private readonly _selectedRole = signal<Role | null>(null);
readonly selectedRole = this._selectedRole.asReadonly();
readonly hasRole = computed(() => this._selectedRole() !== null);
```

### Custom Structural Directive (ShowWhenDirective)

Replaces `@if` with a signal-reactive directive:

```html
<app-loading-spinner *appShowWhen="isLoading()" />
<div *appShowWhen="isAdmin()" class="grid">...</div>
```

### Route Guard

```typescript
export const roleGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  if (roleService.hasRole()) {
    return true;
  }
  return router.createUrlTree(['/access-denied']);
};
```

### TextTransform Pipe

```html
{{ 'USER_MANAGER' | textTransform }}          <!-- Output: User Manager -->
{{ 'ADMIN' | textTransform:'uppercase' }}     <!-- Output: ADMIN -->
{{ 'ADMIN' | textTransform:'capitalize' }}    <!-- Output: Admin -->
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+ or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd boost-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

### Quick Start Guide

1. **Select a Role** — Choose from Admin, Instructor, User, or Manager on the home page
2. **View Data** — After selecting a role, click "Continue" to see role-specific data
3. **Access Protected Route** — Try visiting `/data` directly without a role to see the access denied page

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## License

MIT

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
