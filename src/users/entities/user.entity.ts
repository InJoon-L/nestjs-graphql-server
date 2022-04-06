import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator'

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field(type => String)
  @IsString()
  name: string;

  @Field(type => String)
  @IsEmail()
  email: string;

  @Field(type => String)
  @IsString()
  password: string;

  @Field(type => String, { nullable: true })
  @IsOptional()
  @IsString()
  image?: string;
}
