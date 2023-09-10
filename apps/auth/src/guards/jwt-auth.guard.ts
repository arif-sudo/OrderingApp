import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {}


//This is a built-in authentication guard provided by the @nestjs/passport package.