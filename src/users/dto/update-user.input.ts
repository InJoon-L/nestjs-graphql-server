import { ArgsType, Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
class UpdateUserInputType extends OmitType(CreateUserInput, [
    'email'
] as const) {}

@ArgsType()
@InputType()
export class UpdateUserInput {
    @Field(type => Int)
    id: number

    @Field(type => UpdateUserInputType)
    data: UpdateUserInputType
}
