import { singleton } from '$app';
import { PersonDatasource } from "$data";

@singleton()
export class Datasources {
    constructor(
        public readonly person: PersonDatasource,
    ) { }
}
