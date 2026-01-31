import { computed, Injectable, signal } from '@angular/core';

export interface Role {
  label: string;
  value: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private readonly ROLE_STORAGE_KEY = 'user_role';
  private readonly _selectedRole = signal<Role | null>(this.loadRoleFromStorage());

  readonly selectedRole = this._selectedRole.asReadonly();
  readonly hasRole = computed(() => this._selectedRole() !== null);

  private loadRoleFromStorage(): Role | null {
    try {
      const storedRole = localStorage.getItem(this.ROLE_STORAGE_KEY);
      return storedRole ? JSON.parse(storedRole) : null;
    } catch (error) {
      console.error('Failed to load role from localStorage:', error);
      return null;
    }
  }

  private saveRoleToStorage(role: Role): void {
    try {
      localStorage.setItem(this.ROLE_STORAGE_KEY, JSON.stringify(role));
    } catch (error) {
      console.error('Failed to save role to localStorage:', error);
    }
  }

  private removeRoleFromStorage(): void {
    try {
      localStorage.removeItem(this.ROLE_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove role from localStorage:', error);
    }
  }

  setRole(role: Role): void {
    this._selectedRole.set(role);
    this.saveRoleToStorage(role);
  }

  clearRole(): void {
    this._selectedRole.set(null);
    this.removeRoleFromStorage();
  }
}
