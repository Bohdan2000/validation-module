import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { ProductSize } from '../enums';

export class UserSchema {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}

export class ProductSchema {
  @IsString()
  title: string;

  @IsEnum(ProductSize)
  size: ProductSize;

  @IsString()
  @IsOptional()
  material?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
