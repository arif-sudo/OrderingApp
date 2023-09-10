import { RmqModule } from "@app/common/rmq/rmq.module";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { NestModule } from "@nestjs/common";
import * as cookieParser from 'cookie-parser'
import { AUTH_SERVICE } from "./constants/services";

@Module({
    imports: [
        RmqModule.register({ name: AUTH_SERVICE })
    ],
    exports: [RmqModule]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieParser()).forRoutes('*')
    }
} 