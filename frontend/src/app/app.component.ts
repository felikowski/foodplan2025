import { Component } from '@angular/core';
import { RecipesService } from './recipes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // CommonModule für *ngFor und *ngIf einbinden
  templateUrl: './app.component.html',
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
