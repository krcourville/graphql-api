import { Datasources } from "./datasources";
import { singleton } from '$app';
import { UserContextProvider } from "./user-context";

@singleton()
export class ApiContext {
    constructor(
        public readonly datasources: Datasources,
        public readonly user: UserContextProvider,
    ) {
    }
}
