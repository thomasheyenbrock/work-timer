import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export type Break = {
   __typename?: 'Break',
  id: Scalars['ID'],
  duration?: Maybe<Scalars['Int']>,
};


export type Mutation = {
   __typename?: 'Mutation',
  signup: AuthPayload,
  login: AuthPayload,
  updateWorkTime: WorkTime,
  createWorkTime: WorkTime,
  deleteWorkTime: WorkTime,
  updateBreak: Break,
  createBreak: Break,
  deleteBreak: Break,
  createDraft: Post,
  deletePost?: Maybe<Post>,
  publish?: Maybe<Post>,
};


export type MutationSignupArgs = {
  name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateWorkTimeArgs = {
  id: Scalars['ID'],
  start?: Maybe<Scalars['DateTime']>,
  end?: Maybe<Scalars['DateTime']>
};


export type MutationCreateWorkTimeArgs = {
  start?: Maybe<Scalars['DateTime']>,
  end?: Maybe<Scalars['DateTime']>,
  weekday: Scalars['ID']
};


export type MutationDeleteWorkTimeArgs = {
  id: Scalars['ID']
};


export type MutationUpdateBreakArgs = {
  id: Scalars['ID'],
  duration?: Maybe<Scalars['Int']>
};


export type MutationCreateBreakArgs = {
  duration?: Maybe<Scalars['Int']>,
  weekday: Scalars['ID']
};


export type MutationDeleteBreakArgs = {
  id: Scalars['ID']
};


export type MutationCreateDraftArgs = {
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>
};


export type MutationDeletePostArgs = {
  id?: Maybe<Scalars['ID']>
};


export type MutationPublishArgs = {
  id?: Maybe<Scalars['ID']>
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  published: Scalars['Boolean'],
  title: Scalars['String'],
  content?: Maybe<Scalars['String']>,
  author?: Maybe<User>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  weekDays: Array<Weekday>,
  feed: Array<Post>,
  filterPosts: Array<Post>,
  post?: Maybe<Post>,
};


export type QueryWeekDaysArgs = {
  startDate?: Maybe<Scalars['DateTime']>,
  endDate?: Maybe<Scalars['DateTime']>
};


export type QueryFilterPostsArgs = {
  searchString?: Maybe<Scalars['String']>
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['ID']>
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  posts: Array<Post>,
};

export type Weekday = {
   __typename?: 'Weekday',
  id: Scalars['ID'],
  date: Scalars['DateTime'],
  workTimes: Array<WorkTime>,
  breaks: Array<Break>,
};


export type WeekdayWorkTimesArgs = {
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['ID']>,
  before?: Maybe<Scalars['ID']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type WeekdayBreaksArgs = {
  skip?: Maybe<Scalars['Int']>,
  after?: Maybe<Scalars['ID']>,
  before?: Maybe<Scalars['ID']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type WorkTime = {
   __typename?: 'WorkTime',
  id: Scalars['ID'],
  start?: Maybe<Scalars['DateTime']>,
  end?: Maybe<Scalars['DateTime']>,
};

export type WeekdaysQueryVariables = {
  startDate?: Maybe<Scalars['DateTime']>,
  endDate?: Maybe<Scalars['DateTime']>
};


export type WeekdaysQuery = (
  { __typename?: 'Query' }
  & { weekDays: Array<(
    { __typename?: 'Weekday' }
    & Pick<Weekday, 'id' | 'date'>
    & { workTimes: Array<(
      { __typename?: 'WorkTime' }
      & Pick<WorkTime, 'id' | 'start' | 'end'>
    )>, breaks: Array<(
      { __typename?: 'Break' }
      & Pick<Break, 'id' | 'duration'>
    )> }
  )> }
);


export const WeekdaysDocument = gql`
    query Weekdays($startDate: DateTime, $endDate: DateTime) {
  weekDays(startDate: $startDate, endDate: $endDate) {
    id
    date
    workTimes {
      id
      start
      end
    }
    breaks {
      id
      duration
    }
  }
}
    `;

/**
 * __useWeekdaysQuery__
 *
 * To run a query within a React component, call `useWeekdaysQuery` and pass it any options that fit your needs.
 * When your component renders, `useWeekdaysQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWeekdaysQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useWeekdaysQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WeekdaysQuery, WeekdaysQueryVariables>) {
        return ApolloReactHooks.useQuery<WeekdaysQuery, WeekdaysQueryVariables>(WeekdaysDocument, baseOptions);
      }
export function useWeekdaysLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WeekdaysQuery, WeekdaysQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WeekdaysQuery, WeekdaysQueryVariables>(WeekdaysDocument, baseOptions);
        }
export type WeekdaysQueryHookResult = ReturnType<typeof useWeekdaysQuery>;
export type WeekdaysLazyQueryHookResult = ReturnType<typeof useWeekdaysLazyQuery>;
export type WeekdaysQueryResult = ApolloReactCommon.QueryResult<WeekdaysQuery, WeekdaysQueryVariables>;