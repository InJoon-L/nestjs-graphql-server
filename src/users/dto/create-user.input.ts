import { InputType, OmitType } from '@nestjs/graphql';
import { User } from '../model/user.model';

@InputType()
export class CreateUserInput extends OmitType(User, [
    'id'
] as const, InputType) {}
