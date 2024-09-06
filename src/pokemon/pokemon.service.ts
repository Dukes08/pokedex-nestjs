import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  //using entity as model through dependency injection
  constructor(
    @InjectModel(Pokemon.name) //to be able to inject models in the services
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  //async await because db insertions are asynchronous
  async create(createPokemonDto: CreatePokemonDto) {
    //use the model pokemonModel to create in the db the pokemon, and we pass the object retrive from the dto to pass it
    //Showing better logs to allow the user see the error
    try {
      //saving pokemon in db
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      //11000 = error de duplicado
      if (error.code === 11000) {
        throw new BadRequestException(
          `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
        );
      }
      throw new InternalServerErrorException('Can not create pokemon');
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    //creating a instance of entity
    let pokemon: Pokemon;
    //verifying the id is a number
    if (!isNaN(+term)) {
      //asigning the return pokemon to the pokemon variable. It search its using the term in the db
      //findone is a integrated method mongoose use
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //found pokemon by mongoid
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    //returning error if the pokemon it was not found
    if (!pokemon) throw new NotFoundException('pokemon not found');

    //find by name if it has not being found. trim() to delete backward or forward space
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term });
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    //verifying if the pokemon exist
    const pokemon = await this.findOne(term);
    //the pokemon found will be updated by the giving dto from the user
    //the new: true retrives the updated object
    try {
      //updating pokemon
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return pokemon;
    } catch (error) {
      if ((error.code = 11000)) {
        throw new BadRequestException(`the no you wanted to change the pokemon to ${updatePokemonDto.no} is occupied`);
      }
    }
  }

  async remove(id: string) {
    //finding pokemon
    // const result = await this.pokemonModel.findByIdAndDelete(id)
    //destructuration, saving the deleted count to see if the element exists in the db
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id})
    if(deletedCount === 0){
      throw new BadRequestException(`no pokemon with the "${id}" has been found`)
    }
   
   return;
  }
}
