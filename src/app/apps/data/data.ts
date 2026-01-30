import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import { DataService, User, Post, Product, Country } from '../../core/services/data.service';
import { TextTransformPipe } from '../../shared/pipes/text-transform.pipe';
import { ShowWhenDirective } from '../../shared/directives/show-when.directive';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { ErrorMessageComponent } from '../../shared/components/error-message.component';
import { UserCardComponent } from '../../shared/components/user-card.component';
import { PostCardComponent } from '../../shared/components/post-card.component';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { CountryCardComponent } from '../../shared/components/country-card.component';
import { Paginator } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.html',
  styleUrl: './data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TextTransformPipe,
    ShowWhenDirective,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    UserCardComponent,
    PostCardComponent,
    ProductCardComponent,
    CountryCardComponent,
    Paginator,
    SelectModule,
    FormsModule,
  ],
})
export class DataComponent implements OnInit {
  private readonly roleService = inject(RoleService);
  private readonly dataService = inject(DataService);
  private readonly router = inject(Router);

  readonly selectedRole = this.roleService.selectedRole;
  readonly data = signal<User[] | Post[] | Product[] | Country[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  // Pagination state
  readonly currentPage = signal(0);
  readonly itemsPerPage = signal(10);
  readonly totalItems = signal(100); // Default total, adjust per role

  perPageOptions = [
    { label: '5 per page', value: 5 },
    { label: '10 per page', value: 10 },
    { label: '20 per page', value: 20 },
    { label: '50 per page', value: 50 },
  ];

  readonly isLoading = computed(() => this.loading());
  readonly hasError = computed(() => this.error() !== null);
  readonly showData = computed(() => !this.loading() && !this.error());
  readonly showPagination = computed(() => this.totalItems() > 0);

  readonly isAdmin = computed(() => this.selectedRole()?.value === 'ADMIN');
  readonly isInstructor = computed(() => this.selectedRole()?.value === 'INSTRUCTOR');
  readonly isUser = computed(() => this.selectedRole()?.value === 'USER');
  readonly isManager = computed(() => this.selectedRole()?.value === 'MANAGER');

  readonly users = computed(() => (this.isAdmin() ? (this.data() as User[]) : []));
  readonly posts = computed(() => (this.isInstructor() ? (this.data() as Post[]) : []));
  readonly products = computed(() => (this.isUser() ? (this.data() as Product[]) : []));
  readonly countries = computed(() =>
    this.isManager() ? (this.data() as Country[]) : [],
  );

  readonly dataTitle = computed(() => {
    const role = this.selectedRole()?.value;
    switch (role) {
      case 'ADMIN':
        return 'Users';
      case 'INSTRUCTOR':
        return 'Posts';
      case 'USER':
        return 'Products';
      case 'MANAGER':
        return 'Countries';
      default:
        return 'Data';
    }
  });

  ngOnInit(): void {
    this.fetchData();
  }

  changeRole(): void {
    this.roleService.clearRole();
    this.router.navigate(['/']);
  }

  onPageChange(event: any): void {
    this.currentPage.set(event.page);
    this.fetchData();
  }

  onItemsPerPageChange(newValue: number): void {
    this.itemsPerPage.set(newValue);
    this.currentPage.set(0); // Reset to first page when changing items per page
    this.fetchData();
  }

  private fetchData(): void {
    const role = this.selectedRole()?.value;
    if (!role) return;

    this.loading.set(true);
    this.error.set(null);

    // Set total items based on role (API limitations)
    const totalItemsByRole: Record<string, number> = {
      ADMIN: 10, // JSONPlaceholder has 10 users
      INSTRUCTOR: 100, // JSONPlaceholder has 100 posts
      USER: 20, // FakeStoreAPI has 20 products
      MANAGER: 250, // Countries API (approximate)
    };
    this.totalItems.set(totalItemsByRole[role] || 100);

    const page = this.currentPage() + 1; // Convert 0-based to 1-based
    const limit = this.itemsPerPage();

    this.dataService.fetchDataByRole(role, page, limit).subscribe({
      next: (result) => {
        this.data.set(result);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load data. Please try again.');
        this.loading.set(false);
        console.error(err);
      },
    });
  }
}
