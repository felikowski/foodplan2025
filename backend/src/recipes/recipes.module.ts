import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe } from './entities/recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])], // Recipe-Entität registrieren
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}