import { Component } from '@angular/core';
import { RecipesService } from './recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // CommonModule für *ngFor und *ngIf einbinden
  template: `
    <h1>Recipe List</h1>
    <div *ngIf="recipes.length > 0; else loading">
      <ul>
        <li *ngFor="let recipe of recipes">
          <h3>{{ recipe.title }}</h3>
          <p>{{ recipe.description }}</p>
          <p><strong>Instructions:</strong> {{ recipe.instructions }}</p>
        </li>
      </ul>
    </div>
    <ng-template #loading>
      <p>Loading recipes...</p>
    </ng-template>
  `,
})
export class AppComponent {
  recipes: any[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.getRecipes().subscribe(
      (data) => {
        this.recipes = data; // Rezepte speichern
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
}
