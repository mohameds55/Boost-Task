import { computed, Injectable, signal } from '@angular/core';

export interface Role {
  label: string;
  value: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly _selectedRole = signal<Role | null>(null);

  readonly selectedRole = this._selectedRole.asReadonly();
  readonly hasRole = computed(() => this._selectedRole() !== null);

  setRole(role: Role): void {
    this._selectedRole.set(role);
  }

  clearRole(): void {
    this._selectedRole.set(null);
  }
}
