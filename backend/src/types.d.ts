export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateUserInputType = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  age: Scalars['Int'];
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Create new user */
  createUser: User;
  softDeleteUser: Scalars['Int'];
  restoreUser: User;
};


export type MutationCreateUserArgs = {
  user: CreateUserInputType;
};


export type MutationSoftDeleteUserArgs = {
  userId: Scalars['Float'];
};


export type MutationRestoreUserArgs = {
  userId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  fetchUsers: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  age: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};
