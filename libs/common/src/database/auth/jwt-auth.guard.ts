import { ExecutionContext, Injectable, Inject, CanActivate, UnauthorizedException } from '@nestjs/common'
import { AUTH_SERVICE } from './constants/services'
import { ClientProxy } from '@nestjs/microservices'
import { Observable, catchError, tap } from 'rxjs'

@Injectable()
export default class JwtAuthGuard implements CanActivate {
    constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) { }

    canActivate(context: ExecutionContext): boolean | Promise<any> | Observable<boolean> {
        const authentication = this.getAuhthentication(context);
        return this.authClient.send('validate_user', {
            Authentication: authentication
        }).pipe(
            //The tap operator in RxJS serves primarily as a side-effect operator. 
            tap((res) => {
                this.addUser(res, context);
            }),
            // This uses the tap operator to perform a side effect when the observable emits a value. In this case, it takes the emitted value (res) and calls the addUser method with that value and the context as arguments. It allows you to perform actions without modifying the emitted data.
            catchError(() => {
                throw new UnauthorizedException();
            })
        )
    }

    private getAuhthentication(context: ExecutionContext): any {
        let authentication: string;

        if (context.getType() === 'http') {
            authentication = context.switchToHttp().getRequest().cookies?.Authentication;
        } else if (context.getType() === 'rpc') {
            authentication = context.switchToRpc().getData().Authentication;
        }

        if (!authentication) {
            throw new UnauthorizedException('No value was provided for Authentication')
        }

        return authentication;
    }

    private addUser(user: any, context: ExecutionContext) {
        if (context.getType() === 'http') {
            context.switchToHttp().getRequest().user = user;
        } else if (context.getType() === 'rpc') {
            context.switchToRpc().getData().user = user;
        }
    }

}