import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  flags: { png: string };
}

export type RoleData = User[] | Post[] | Product[] | Country[];

const API_ENDPOINTS: Record<string, string> = {
  ADMIN: 'https://jsonplaceholder.typicode.com/users',
  INSTRUCTOR: 'https://jsonplaceholder.typicode.com/posts',
  USER: 'https://fakestoreapi.com/products',
  MANAGER: 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags',
};

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  fetchDataByRole(role: string, page: number = 1, limit: number = 10): Observable<RoleData> {
    const baseEndpoint = API_ENDPOINTS[role];

    if (!baseEndpoint) {
      return of([]);
    }

    // Calculate start index for pagination
    const start = (page - 1) * limit + 1;
    const end = page * limit;

    let endpoint = baseEndpoint;

    // Add pagination parameters based on role/API
    if (role === 'ADMIN' || role === 'INSTRUCTOR') {
      // JSONPlaceholder uses _start and _limit
      endpoint += `?_start=${(page - 1) * limit}&_limit=${limit}`;
    } else if (role === 'USER') {
      // FakeStoreAPI uses limit parameter only (doesn't support pagination)
      endpoint += `?limit=${limit}`;
    }
    // Countries API returns all data, so we handle pagination client-side
    else if (role === 'MANAGER') {
      return this.http.get<RoleData>(endpoint).pipe(
        map((countries: any) => {
          const startIndex = (page - 1) * limit;
          const endIndex = startIndex + limit;
          return countries.slice(startIndex, endIndex);
        })
      );
    }

    return this.http.get<RoleData>(endpoint);
  }
}
