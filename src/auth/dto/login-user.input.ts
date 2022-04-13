import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginUserInput {
    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;
}