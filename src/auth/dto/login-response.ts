import { Field, ObjectType } from "@nestjs/graphql";
import { User } from '../../users/model/user.model';

@ObjectType()
export class LoginResponse {
    @Field(type => String)
    access_token: string;

    @Field(type => User)
    user: User;
}