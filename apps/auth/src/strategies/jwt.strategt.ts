import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../auth.service';
import { Types } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly userService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) => {
                    return request?.Authentication;
                }
            ]),
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }


    async validate({ userId }: TokenPayload) {
        try {
            return await this.userService.getUser({
                _id: new Types.ObjectId(userId)
            })
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

}