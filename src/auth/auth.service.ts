import { Injectable } from '@nestjs/common';
import { User } from 'src/users/model/user.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (user && user.password === password) { 
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: User): Promise<any> {
        return {
            access_token: this.jwtService.sign({ 
                email: user.email,
                sub: user.id 
            }),
            user
        }
    }
}
