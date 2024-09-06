import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// extends to document it adds functionality like methods, etc
//to identify it is a schema from a db use the decorator
@Schema()
export class Pokemon extends Document {
    @Prop({
        unique: true, //the name needs to be unique
        index: true, //each name has a index to locate the name faster in the db
    })
    name: string;
    @Prop({
        unique: true, //the name needs to be unique
        index: true, //each name has a index to locate the name faster in the db
    })
    no: number;
}

//this schema tells the db when its initializing what defenitions needs to use, the rules, etc. its like a map

export const pokemonSchema = SchemaFactory.createForClass(Pokemon)
