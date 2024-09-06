import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, pokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  //here we are stablishing a conection with the schema calling it from the entities folder to access it in the service through dependency injection
  imports: [
    MongooseModule.forFeature([
      //model creation
      {
        //entity created in the entities
        name: Pokemon.name,
        //schema created in the entities folder
        schema: pokemonSchema,
      },
    ]),
  ],
})
export class PokemonModule {}
