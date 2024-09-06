import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    
    @MinLength(1)
    @IsString()
    name: string;
    
    @Min(1)
    @IsPositive()
    @IsInt()
    no: number;
}
