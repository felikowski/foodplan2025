import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import { SeedService } from './seed/seed.service';
import {Repository} from "typeorm";
import {User} from "./users/entities/user.entity";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import { RecipesModule } from './recipes/recipes.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import {Ingredient} from "./ingredients/entities/ingredient.entity";
import {Recipe} from "./recipes/entities/recipe.entity";
import {RecipeIngredient} from "./recipes/entities/recipe-ingredient.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: '../database/database.sqlite',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      UsersModule,
      TypeOrmModule.forFeature([User, Ingredient, Recipe, RecipeIngredient ]),
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', '..', 'frontend/dist/frontend/browser'),
      }),
      RecipesModule,
      IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
