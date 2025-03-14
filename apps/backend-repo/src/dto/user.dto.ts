import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import * as bcrypt from "bcryptjs";
import { Transform } from "class-transformer";
import { User } from "../entities/user";
import { GenderEnum } from "@repo/interfaces/user";

export class ReqGetUserListDTO {
  @IsOptional()
  sort?: string;

  @IsOptional()
  order?: any;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit: number = 5;
}

export class CreateUserDTO implements Partial<User> {
  @IsNotEmpty({ message: "username must be input" })
  @IsString()
  username: string;

  @IsNotEmpty({ message: "email must be input" })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  // @Transform(async ({ value }) => {
  //   if (value == undefined || !value) {
  //     value = "admin";
  //   }
  //   await bcrypt.hashSync(value, 10);
  // })
  password?: string;

  @IsOptional()
  @IsUrl()
  profile_picture: string;

  @IsOptional()
  @IsNotEmpty()
  age: number;

  @IsOptional()
  @IsEnum(GenderEnum, { message: "Value gender must be in list enum" })
  gender: GenderEnum;

  @IsOptional()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsDate()
  created_at: Date = new Date();

  @IsOptional()
  @IsString()
  created_by: string = "admin";

  @IsOptional()
  @IsNumber()
  total_average_weight_ratings: number;

  @IsOptional()
  @IsNumber()
  number_of_rents: number;

  @IsOptional()
  @IsNumber()
  recently_Active: number;
}

export class UpdateUserDTO implements Partial<User> {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsUrl()
  profile_picture?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsOptional()
  @IsString()
  address?: string;

  updated_at: Date = new Date();

  updated_by: string = "admin";

  @IsOptional()
  @IsNumber()
  total_average_weight_ratings: number;

  @IsOptional()
  @IsNumber()
  number_of_rents: number;

  @IsOptional()
  @IsNumber()
  recently_active: number;
}
