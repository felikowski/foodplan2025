import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';

@Entity()
export class RecipeIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, (recipe) => recipe.recipeIngredients, { onDelete: 'CASCADE' })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients, { onDelete: 'CASCADE' })
    ingredient: Ingredient;

    @Column()
    quantity: number;

    @Column({ nullable: true })
    unit: string; // Einheit wie "g", "ml", "Stück"
}