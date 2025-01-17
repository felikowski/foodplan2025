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

        const users = await this.userRepository.save([
            {
                name: 'Admin',
                email: 'admin@example.com',
                password: 'admin123', // In der Praxis solltest du Passwörter hashen
            },
            {
                name: 'User',
                email: 'user@example.com',
                password: 'user123', // In der Praxis solltest du Passwörter hashen
            },
        ]);

        // Zutaten erstellen
        const ingredients = await this.ingredientRepository.save([
            { name: 'Mehl' },
            { name: 'Tomatensoße' },
            { name: 'Mozzarella' },
            { name: 'Basilikum' },
            { name: 'Olivenöl' },
        ]);

        // Rezepte erstellen
        const recipes = await this.recipeRepository.save([
            {
                title: 'Pizza Margherita',
                description: 'Ein italienischer Klassiker.',
                instructions: 'Backe die Pizza bei 220 Grad für 15 Minuten.',
            },
            {
                title: 'Pasta mit Tomatensoße',
                description: 'Schnell und lecker.',
                instructions: 'Koche die Nudeln und füge die Tomatensoße hinzu.',
            },
        ]);

        // Zutaten mit Rezepten verbinden
        await this.recipeIngredientRepository.save([
            {
                recipe: recipes[0],
                ingredient: ingredients[0], // Mehl
                quantity: 500,
                unit: 'g',
            },
            {
                recipe: recipes[0],
                ingredient: ingredients[1], // Tomatensoße
                quantity: 200,
                unit: 'ml',
            },
            {
                recipe: recipes[0],
                ingredient: ingredients[2], // Mozzarella
                quantity: 200,
                unit: 'g',
            },
            {
                recipe: recipes[1],
                ingredient: ingredients[1], // Tomatensoße
                quantity: 150,
                unit: 'ml',
            },
            {
                recipe: recipes[1],
                ingredient: ingredients[3], // Basilikum
                quantity: 5,
                unit: 'Blätter',
            },
        ]);

        console.log('Seed-Daten erfolgreich eingefügt!');
    }
}