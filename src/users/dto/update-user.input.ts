import { ArgsType, Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
class UpdateUserInputType extends PartialType(CreateUserInput) {}

@ArgsType()
@InputType()
export class UpdateUserInput {
    @Field(type => Int)
    id: number

    @Field(type => UpdateUserInputType)
    data: UpdateUserInputType
}
