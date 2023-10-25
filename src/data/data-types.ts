
const DELIM = "#";

export const EntityType = {
    PERSON: 'P',
    DOG_BREED: 'DB',
    EDGE: 'E',
    VET: 'V',
    FOLLOW: 'F'
};
export type DogBreedModel = {
    id: string;
    name: string;
    knownFor: string;
    createdBy: string;
};

export type PersonModel = {
    id: string;
    name: string;
};


export function composeKey(...args: string[]) {
    return args.join(DELIM);
}

export function extractId(key: string): string {
    const id = key.split(DELIM).at(-1);
    if (id == null) {
        throw new Error("could not extract id");
    }

    return id;
}
