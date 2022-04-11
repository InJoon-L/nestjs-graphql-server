import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./model/user.model";


@ObjectType()
export class CreateUserResponse {
    @Field(type => User, { nullable: true })
    user?: User;

    @Field(type => String)
    msg: string;

    @Field(type => Boolean)
    status: boolean;
}