import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service automatisch in die Anwendung einbinden
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/api/recipes'; // API-URL

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
