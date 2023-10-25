import { GraphQLResolveInfo } from 'graphql';
import { PersonModel, DogBreedModel } from 'src/data/data-types';
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

export type FollowConnection = {
  __typename?: 'FollowConnection';
  edges: Array<FollowEdge>;
  pageInfo: PageInfo;
};

export type FollowEdge = {
  __typename?: 'FollowEdge';
  cursor: Scalars['String']['output'];
  established: Scalars['String']['output'];
  node: VetNode;
};

export type FollowInput = {
  personId: Scalars['ID']['input'];
  vet: FollowVetInput;
};

export type FollowResult = {
  __typename?: 'FollowResult';
  success: Scalars['Boolean']['output'];
};

export type FollowVetInput = {
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  vetId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  follow: FollowResult;
};


export type MutationFollowArgs = {
  input: FollowInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
};

export type PersonNode = {
  __typename?: 'PersonNode';
  follows?: Maybe<FollowConnection>;
  id: Scalars['ID']['output'];
};


export type PersonNodeFollowsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  person?: Maybe<PersonNode>;
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};

export type VetNode = {
  __typename?: 'VetNode';
  id: Scalars['ID']['output'];
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
  FollowConnection: ResolverTypeWrapper<FollowConnection>;
  FollowEdge: ResolverTypeWrapper<FollowEdge>;
  FollowInput: FollowInput;
  FollowResult: ResolverTypeWrapper<FollowResult>;
  FollowVetInput: FollowVetInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PersonNode: ResolverTypeWrapper<PersonNode>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  VetNode: ResolverTypeWrapper<VetNode>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  FollowConnection: FollowConnection;
  FollowEdge: FollowEdge;
  FollowInput: FollowInput;
  FollowResult: FollowResult;
  FollowVetInput: FollowVetInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  PersonNode: PersonNode;
  Query: {};
  String: Scalars['String']['output'];
  VetNode: VetNode;
}>;

export type FollowConnectionResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['FollowConnection'] = ResolversParentTypes['FollowConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['FollowEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowEdgeResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['FollowEdge'] = ResolversParentTypes['FollowEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  established?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['VetNode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FollowResultResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['FollowResult'] = ResolversParentTypes['FollowResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  follow?: Resolver<ResolversTypes['FollowResult'], ParentType, ContextType, RequireFields<MutationFollowArgs, 'input'>>;
}>;

export type PageInfoResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PersonNodeResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['PersonNode'] = ResolversParentTypes['PersonNode']> = ResolversObject<{
  follows?: Resolver<Maybe<ResolversTypes['FollowConnection']>, ParentType, ContextType, Partial<PersonNodeFollowsArgs>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  person?: Resolver<Maybe<ResolversTypes['PersonNode']>, ParentType, ContextType, RequireFields<QueryPersonArgs, 'id'>>;
}>;

export type VetNodeResolvers<ContextType = ApiContext, ParentType extends ResolversParentTypes['VetNode'] = ResolversParentTypes['VetNode']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApiContext> = ResolversObject<{
  FollowConnection?: FollowConnectionResolvers<ContextType>;
  FollowEdge?: FollowEdgeResolvers<ContextType>;
  FollowResult?: FollowResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PersonNode?: PersonNodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  VetNode?: VetNodeResolvers<ContextType>;
}>;


/**
 * @typedef {Object} FollowConnection
 * @property {Array<FollowEdge>} edges
 * @property {PageInfo} pageInfo
 */

/**
 * @typedef {Object} FollowEdge
 * @property {string} cursor
 * @property {string} established
 * @property {VetNode} node
 */

/**
 * @typedef {Object} FollowInput
 * @property {string} personId
 * @property {FollowVetInput} vet
 */

/**
 * @typedef {Object} FollowResult
 * @property {boolean} success
 */

/**
 * @typedef {Object} FollowVetInput
 * @property {string} location
 * @property {string} name
 * @property {string} vetId
 */

/**
 * @typedef {Object} Mutation
 * @property {FollowResult} follow
 */

/**
 * @typedef {Object} PageInfo
 * @property {string} endCursor
 * @property {boolean} hasNextPage
 */

/**
 * @typedef {Object} PersonNode
 * @property {FollowConnection} [follows]
 * @property {string} id
 */

/**
 * @typedef {Object} Query
 * @property {PersonNode} [person]
 */

/**
 * @typedef {Object} VetNode
 * @property {string} id
 */