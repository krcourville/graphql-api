import { singleton } from '$app';
import { DogBreedsDatasource, FriendsDatasource } from "$data";

@singleton()
export class Datasources {
    constructor(
        public readonly friends: FriendsDatasource,
        public readonly dogBreeds: DogBreedsDatasource,
    ) { }
}
