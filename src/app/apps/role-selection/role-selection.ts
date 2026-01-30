import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RadioButton } from 'primeng/radiobutton';
import { Button } from 'primeng/button';
import { Role, RoleService } from '../../core/services/role.service';

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RadioButton, Button],
})
export class RoleSelectionComponent {
  private readonly roleService = inject(RoleService);
  private readonly router = inject(Router);

  readonly roles: Role[] = [
    { label: 'Admin', value: 'ADMIN', description: 'Full system access and user management' },
    { label: 'Instructor', value: 'INSTRUCTOR', description: 'Create courses and manage students' },
    { label: 'User', value: 'USER', description: 'Access and consume content' },
    { label: 'Manager', value: 'MANAGER', description: 'Oversee teams and reports' },
  ];

  selectedRoleValue = signal<string>('');

  isSelectionValid = computed(() => this.selectedRoleValue().length > 0);

  onRoleSelect(value: string): void {
    this.selectedRoleValue.set(value);
  }

  onContinue(): void {
    if (this.isSelectionValid()) {
      const selected = this.roles.find(role => role.value === this.selectedRoleValue());
      if (selected) {
        this.roleService.setRole(selected);
        this.router.navigate(['/data']);
      }
    }
  }
}
