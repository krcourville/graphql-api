import { singleton } from '$app';
import { FriendDatasource } from "$data";

@singleton()
export class Datasources {
    constructor(
        public readonly friend: FriendDatasource,
    ) { }
}
