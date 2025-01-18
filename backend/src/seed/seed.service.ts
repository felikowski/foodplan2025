import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {Recipe} from "../recipes/entities/recipe.entity";
import {Ingredient} from "../ingredients/entities/ingredient.entity";
import {RecipeIngredient} from "../recipes/entities/recipe-ingredient.entity";

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>,
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
        @InjectRepository(RecipeIngredient)
        private readonly recipeIngredientRepository: Repository<RecipeIngredient>,
    ) {}

    async runSeed() {
        const userCount = await this.userRepository.count();
        console.log('Seed-Daten werden eingefügt...');

        await this.userRepository.clear();
        await this.recipeIngredientRepository.clear();
        await this.recipeRepository.clear();
        await this.ingredientRepository.clear();

        await this.userRepository.save([
            {
                id: 1,
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin123', // In der Praxis solltest du Passwörter hashen
            },
            {
                id: 2,
                name: 'User',
                email: 'user@example.com',
                password: 'user123', // In der Praxis solltest du Passwörter hashen
            },
        ]);

        // Zutaten erstellen
        const ingredients = await this.ingredientRepository.save([
            { id: 1, name: 'Mehl' },
            { id: 2, name: 'Tomatensoße' },
            { id: 3, name: 'Mozzarella' },
            { id: 4, name: 'Basilikum' },
            { id: 5, name: 'Olivenöl' },
            { id: 6, name: 'Pasta' },
        ]);

        // Rezepte erstellen
        const recipes = await this.recipeRepository.save([
            {
                id: 1,
                title: 'Pizza Margherita',
                description: 'Ein italienischer Klassiker.',
                instructions: 'Backe die Pizza bei 220 Grad für 15 Minuten.',
            },
            {
                id: 2,
                title: 'Pasta mit Tomatensoße',
                description: 'Schnell und lecker.',
                instructions: 'Koche die Nudeln und füge die Tomatensoße hinzu.',
            },
        ]);

        // Zutaten mit Rezepten verbinden
        await this.recipeIngredientRepository.save([
            {
                id: 1,
                recipe: recipes[0],
                ingredient: ingredients[0], // Mehl
                quantity: 500,
                unit: 'g',
            },
            {
                id: 2,
                recipe: recipes[0],
                ingredient: ingredients[1], // Tomatensoße
                quantity: 200,
                unit: 'ml',
            },
            {
                id: 3,
                recipe: recipes[0],
                ingredient: ingredients[2], // Mozzarella
                quantity: 200,
                unit: 'g',
            },
            {
                id: 4,
                recipe: recipes[1],
                ingredient: ingredients[1], // Tomatensoße
                quantity: 150,
                unit: 'ml',
            },
            {
                id: 5,
                recipe: recipes[1],
                ingredient: ingredients[3], // Basilikum
                quantity: 5,
                unit: 'Blätter',
            },
            {
                id: 6,
                recipe: recipes[1],
                ingredient: ingredients[5], // Basilikum
                quantity: 500,
                unit: 'g',
            },
        ]);

        console.log('Seed-Daten erfolgreich eingefügt!');
    }
}