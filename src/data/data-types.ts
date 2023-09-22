
const DELIM = "#";
export const FRIEND = 'F';

export const EntityType = {
    FRIEND: 'F',
    DOG_BREED: 'DB',
};
export type DogBreedEntity = {
    id: string;
    name: string;
    knownFor: string;
    createdBy: string;
};

export type FriendEntity = {
    id: string;
    name: string;
    dogBreedId: string;
};
