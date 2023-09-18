import { GraphQLResolveInfo } from 'graphql';
import { ApiContext } from '../../context/index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type DogBreed = {
  __typename?: 'DogBreed';
  id: Scalars['ID']['output'];
  knownFor: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type DogBreedInput = {
  knownFor: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Friend = {
  __typename?: 'Friend';
  dogBreed: DogBreed;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type FriendInput = {
  dogBreedId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDog: DogBreed;
  addFriend: Friend;
};


export type MutationAddDogArgs = {
  item: DogBreedInput;
};


export type MutationAddFriendArgs = {
  item: FriendInput;
};

export type Query = {
  __typename?: 'Query';
  dogBreeds: Array<DogBreed>;
  friend?: Maybe<Friend>;
};


export type QueryFriendArgs = {
  id: Scalars['ID']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DogBreed: ResolverTypeWrapper<DogBreed>;
  DogBreedInput: DogBreedInput;
  Friend: ResolverTypeWrapper<Friend>;
  FriendInput: FriendInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  DogBreed: DogBreed;
  DogBreedInput: DogBreedInput;
  Friend: Friend;
  FriendInput: FriendInput;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
}>;

export type DogBreedResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['DogBreed'] = ResolversParentTypes['DogBreed']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  knownFor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FriendResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']> = ResolversObject<{
  dogBreed?: Resolver<ResolversTypes['DogBreed'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addDog?: Resolver<ResolversTypes['DogBreed'], ParentType, ContextType, RequireFields<MutationAddDogArgs, 'item'>>;
  addFriend?: Resolver<ResolversTypes['Friend'], ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'item'>>;
}>;

export type QueryResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  dogBreeds?: Resolver<Array<ResolversTypes['DogBreed']>, ParentType, ContextType>;
  friend?: Resolver<Maybe<ResolversTypes['Friend']>, ParentType, ContextType, RequireFields<QueryFriendArgs, 'id'>>;
}>;

export type Resolvers<ContextType = ApiContext> = ResolversObject<{
  DogBreed?: DogBreedResolvers<ContextType>;
  Friend?: FriendResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;


/**
 * @typedef {Object} DogBreed
 * @property {string} id
 * @property {string} knownFor
 * @property {string} name
 */

/**
 * @typedef {Object} DogBreedInput
 * @property {string} knownFor
 * @property {string} name
 */

/**
 * @typedef {Object} Friend
 * @property {DogBreed} dogBreed
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} FriendInput
 * @property {string} dogBreedId
 * @property {string} name
 */

/**
 * @typedef {Object} Mutation
 * @property {DogBreed} addDog
 * @property {Friend} addFriend
 */

/**
 * @typedef {Object} Query
 * @property {Array<DogBreed>} dogBreeds
 * @property {Friend} [friend]
 */