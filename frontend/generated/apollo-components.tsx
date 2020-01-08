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

export type CreateWorkTimeMutationVariables = {
  weekday: Scalars['ID'],
  start?: Maybe<Scalars['DateTime']>,
  end?: Maybe<Scalars['DateTime']>
};


export type CreateWorkTimeMutation = (
  { __typename?: 'Mutation' }
  & { createWorkTime: (
    { __typename?: 'WorkTime' }
    & Pick<WorkTime, 'id' | 'start' | 'end'>
  ) }
);

export type DeleteWorkTimeMutationVariables = {
  id: Scalars['ID']
};


export type DeleteWorkTimeMutation = (
  { __typename?: 'Mutation' }
  & { deleteWorkTime: (
    { __typename?: 'WorkTime' }
    & Pick<WorkTime, 'id' | 'start' | 'end'>
  ) }
);

export type UpdateWorkTimeMutationVariables = {
  id: Scalars['ID'],
  start?: Maybe<Scalars['DateTime']>,
  end?: Maybe<Scalars['DateTime']>
};


export type UpdateWorkTimeMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkTime: (
    { __typename?: 'WorkTime' }
    & Pick<WorkTime, 'id' | 'start' | 'end'>
  ) }
);

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


export const CreateWorkTimeDocument = gql`
    mutation CreateWorkTime($weekday: ID!, $start: DateTime, $end: DateTime) {
  createWorkTime(weekday: $weekday, start: $start, end: $end) {
    id
    start
    end
  }
}
    `;
export type CreateWorkTimeMutationFn = ApolloReactCommon.MutationFunction<CreateWorkTimeMutation, CreateWorkTimeMutationVariables>;

/**
 * __useCreateWorkTimeMutation__
 *
 * To run a mutation, you first call `useCreateWorkTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkTimeMutation, { data, loading, error }] = useCreateWorkTimeMutation({
 *   variables: {
 *      weekday: // value for 'weekday'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useCreateWorkTimeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWorkTimeMutation, CreateWorkTimeMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateWorkTimeMutation, CreateWorkTimeMutationVariables>(CreateWorkTimeDocument, baseOptions);
      }
export type CreateWorkTimeMutationHookResult = ReturnType<typeof useCreateWorkTimeMutation>;
export type CreateWorkTimeMutationResult = ApolloReactCommon.MutationResult<CreateWorkTimeMutation>;
export type CreateWorkTimeMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateWorkTimeMutation, CreateWorkTimeMutationVariables>;
export const DeleteWorkTimeDocument = gql`
    mutation DeleteWorkTime($id: ID!) {
  deleteWorkTime(id: $id) {
    id
    start
    end
  }
}
    `;
export type DeleteWorkTimeMutationFn = ApolloReactCommon.MutationFunction<DeleteWorkTimeMutation, DeleteWorkTimeMutationVariables>;

/**
 * __useDeleteWorkTimeMutation__
 *
 * To run a mutation, you first call `useDeleteWorkTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkTimeMutation, { data, loading, error }] = useDeleteWorkTimeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkTimeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteWorkTimeMutation, DeleteWorkTimeMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteWorkTimeMutation, DeleteWorkTimeMutationVariables>(DeleteWorkTimeDocument, baseOptions);
      }
export type DeleteWorkTimeMutationHookResult = ReturnType<typeof useDeleteWorkTimeMutation>;
export type DeleteWorkTimeMutationResult = ApolloReactCommon.MutationResult<DeleteWorkTimeMutation>;
export type DeleteWorkTimeMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteWorkTimeMutation, DeleteWorkTimeMutationVariables>;
export const UpdateWorkTimeDocument = gql`
    mutation UpdateWorkTime($id: ID!, $start: DateTime, $end: DateTime) {
  updateWorkTime(id: $id, start: $start, end: $end) {
    id
    start
    end
  }
}
    `;
export type UpdateWorkTimeMutationFn = ApolloReactCommon.MutationFunction<UpdateWorkTimeMutation, UpdateWorkTimeMutationVariables>;

/**
 * __useUpdateWorkTimeMutation__
 *
 * To run a mutation, you first call `useUpdateWorkTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkTimeMutation, { data, loading, error }] = useUpdateWorkTimeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useUpdateWorkTimeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWorkTimeMutation, UpdateWorkTimeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWorkTimeMutation, UpdateWorkTimeMutationVariables>(UpdateWorkTimeDocument, baseOptions);
      }
export type UpdateWorkTimeMutationHookResult = ReturnType<typeof useUpdateWorkTimeMutation>;
export type UpdateWorkTimeMutationResult = ApolloReactCommon.MutationResult<UpdateWorkTimeMutation>;
export type UpdateWorkTimeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWorkTimeMutation, UpdateWorkTimeMutationVariables>;
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