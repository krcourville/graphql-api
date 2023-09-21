/**
 * Dependency Injection Utilities
 *
 * Usage:
 * 1. On class that need injecting
 *    import { singleton } from "@di/services";
 *    @singleton()
 *    export class MyService() {
 *      // TODO: implement me
 *    }
 * 2. In a lambda entry point.
 *    import { resolve } from "@di/services";
 *    import { MyService } from "./somepath/my-service";
 *    const myService = resolve(MyService);
 */

import '@abraham/reflection';
import { SNSClient } from '@aws-sdk/client-sns';
import { container, inject, singleton } from 'tsyringe';



/**
 * Resolve an item from the Inversion of Control container.
 *
 * Usage:
 *    import { resolve } from "@di/services";
 *    import { MyService } from "./somepath/my-service";
 *    const myService = resolve(MyService);
 *
 *    WARNING: the above uses service locator pattern
 *    that should be used sparingly, only in entry points,
 *    with some possible references in unit tests.
 *    Otherwise, overuse of service locator will result
 *    in unmaintainable code and circular dependencies.
 *
 * @param token
 * @returns
 */
export const resolve = container.resolve.bind(container);

const awsClientConfig = {
    /**
     * allow local development against emulation.
     * when AWS_ENDPOINT is undefined, calls will
     * be made against the real AWS services.
     */
    endpoint: process.env.AWS_ENDPOINT,
}

// const sns = new SNSClient(awsClientConfig);

// const snsClient = Symbol('snsClient');

// container.registerInstance(snsClient, sns);


// class Whatever {
//     constructor(
//         @inject(snsClient) private readonly sns: SNSClient,
//      {}
// }


export { singleton };
