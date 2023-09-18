import { Resolvers } from '../types';
import { Query, DogBreed, Friend } from './queries';
import Mutation from './mutations';

export const resolvers: Resolvers = { Query, DogBreed, Friend, Mutation };
