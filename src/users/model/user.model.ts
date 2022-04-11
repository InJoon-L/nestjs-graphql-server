import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

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

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
