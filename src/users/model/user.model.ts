import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column()
  @IsString()
  name: string;

  @Field(type => String)
  @Column({unique: true})
  @IsEmail()
  email: string;

  @Field(type => String)
  @Column()
  @IsString()
  password: string;

  @Field(type => String, { nullable: true })
  @Column({nullable: true})
  @IsOptional()
  @IsString()
  image?: string;
}
