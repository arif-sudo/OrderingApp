import { DynamicModule, Module } from '@nestjs/common'
import { RmqService } from './rmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RmqModuleInterface {
    name: string;
}

@Module({
    providers: [RmqService],
    exports: [RmqService]
})
export class RmqModule {
    // https://docs.nestjs.com/fundamentals/dynamic-modules#dynamic-module-use-case
    // Dynamic modules  allow you to configure modules at runtime.
    // This means you can provide custom settings, services, or dependencies based on runtime conditions or configuration files
    // A dynamic module is nothing more than a module created at run-time

    static register({ name }: RmqModuleInterface): DynamicModule {
        return {
            module: RmqModule,
            imports: [
                ClientsModule.registerAsync([{
                    name,
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.RMQ,
                        options: {
                            urls: [configService.get<string>('RMQ_URI')],
                            queue: configService.get<string>(`RMQ_${name}_QUEUE`)
                        }
                    }),
                    inject: [ConfigService]
                }])
            ],
            exports: [ClientsModule]
        }
    }
}