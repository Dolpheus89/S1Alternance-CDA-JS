import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends " $fragmentName" | "__typename"
              ? T[P]
              : never
      }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
}

export type Ads = {
    __typename?: "Ads"
    category: Categories
    createdAt: Scalars["String"]["output"]
    description?: Maybe<Scalars["String"]["output"]>
    id: Scalars["ID"]["output"]
    location?: Maybe<Scalars["String"]["output"]>
    owner: Scalars["String"]["output"]
    picture?: Maybe<Scalars["String"]["output"]>
    price: Scalars["Int"]["output"]
    tags: Array<Tags>
    title: Scalars["String"]["output"]
}

export type AdsInput = {
    category: CategoryInput
    description?: InputMaybe<Scalars["String"]["input"]>
    location?: InputMaybe<Scalars["String"]["input"]>
    owner: Scalars["String"]["input"]
    picture?: InputMaybe<Scalars["String"]["input"]>
    price?: InputMaybe<Scalars["Int"]["input"]>
    tags?: InputMaybe<Array<Scalars["String"]["input"]>>
    title: Scalars["String"]["input"]
}

export type Categories = {
    __typename?: "Categories"
    ads: Array<Ads>
    id: Scalars["ID"]["output"]
    name: Scalars["String"]["output"]
}

export type CategoryInput = {
    id?: InputMaybe<Scalars["Int"]["input"]>
    name?: InputMaybe<Scalars["String"]["input"]>
}

export type Mutation = {
    __typename?: "Mutation"
    AddAd?: Maybe<Ads>
    deleteAd: Scalars["Boolean"]["output"]
}

export type MutationAddAdArgs = {
    adData: AdsInput
}

export type MutationDeleteAdArgs = {
    id: Scalars["Float"]["input"]
}

export type Query = {
    __typename?: "Query"
    getAdById?: Maybe<Ads>
    getAdByTitle: Array<Ads>
    getAdsByCategory: Array<Ads>
    getAdsByTag: Array<Ads>
    getAllAds: Array<Ads>
    getAllCategories: Array<Categories>
    getAllTags: Array<Tags>
    getTagById: Array<Tags>
}

export type QueryGetAdByIdArgs = {
    id: Scalars["Float"]["input"]
}

export type QueryGetAdByTitleArgs = {
    title: Scalars["String"]["input"]
}

export type QueryGetAdsByCategoryArgs = {
    name: Scalars["String"]["input"]
}

export type QueryGetAdsByTagArgs = {
    name: Scalars["String"]["input"]
}

export type QueryGetTagByIdArgs = {
    id: Scalars["Float"]["input"]
}

export type Tags = {
    __typename?: "Tags"
    ads: Array<Ads>
    id: Scalars["ID"]["output"]
    name: Scalars["String"]["output"]
}

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllAdsQuery = {
    __typename?: "Query"
    getAllAds: Array<{
        __typename?: "Ads"
        id: string
        title: string
        description?: string | null
        price: number
        picture?: string | null
    }>
}

export type GetAdsByCategoryQueryVariables = Exact<{
    name: Scalars["String"]["input"]
}>

export type GetAdsByCategoryQuery = {
    __typename?: "Query"
    getAdsByCategory: Array<{
        __typename?: "Ads"
        id: string
        title: string
        description?: string | null
        price: number
        picture?: string | null
    }>
}

export type GetAdsByTitleQueryVariables = Exact<{
    title: Scalars["String"]["input"]
}>

export type GetAdsByTitleQuery = {
    __typename?: "Query"
    getAdByTitle: Array<{
        __typename?: "Ads"
        id: string
        title: string
        description?: string | null
        price: number
        picture?: string | null
    }>
}

export type GetAdByIdQueryVariables = Exact<{
    id: Scalars["Float"]["input"]
}>

export type GetAdByIdQuery = {
    __typename?: "Query"
    getAdById?: {
        __typename?: "Ads"
        id: string
        title: string
        description?: string | null
        location?: string | null
        owner: string
        price: number
        picture?: string | null
        createdAt: string
    } | null
}

export type AddAdMutationVariables = Exact<{
    adData: AdsInput
}>

export type AddAdMutation = {
    __typename?: "Mutation"
    AddAd?: {
        __typename?: "Ads"
        title: string
        owner: string
        price: number
        location?: string | null
        description?: string | null
        category: { __typename?: "Categories"; name: string }
    } | null
}

export type DeleteAdMutationVariables = Exact<{
    deleteAdId: Scalars["Float"]["input"]
}>

export type DeleteAdMutation = { __typename?: "Mutation"; deleteAd: boolean }

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllCategoriesQuery = {
    __typename?: "Query"
    getAllCategories: Array<{
        __typename?: "Categories"
        id: string
        name: string
    }>
}

export const GetAllAdsDocument = gql`
    query GetAllAds {
        getAllAds {
            id
            title
            description
            price
            picture
        }
    }
`

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetAllAdsQuery,
        GetAllAdsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(
        GetAllAdsDocument,
        options
    )
}
export function useGetAllAdsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAllAdsQuery,
        GetAllAdsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(
        GetAllAdsDocument,
        options
    )
}
export function useGetAllAdsSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        GetAllAdsQuery,
        GetAllAdsQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(
        GetAllAdsDocument,
        options
    )
}
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>
export type GetAllAdsLazyQueryHookResult = ReturnType<
    typeof useGetAllAdsLazyQuery
>
export type GetAllAdsSuspenseQueryHookResult = ReturnType<
    typeof useGetAllAdsSuspenseQuery
>
export type GetAllAdsQueryResult = Apollo.QueryResult<
    GetAllAdsQuery,
    GetAllAdsQueryVariables
>
export const GetAdsByCategoryDocument = gql`
    query GetAdsByCategory($name: String!) {
        getAdsByCategory(name: $name) {
            id
            title
            description
            price
            picture
        }
    }
`

/**
 * __useGetAdsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetAdsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByCategoryQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetAdsByCategoryQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetAdsByCategoryQuery,
        GetAdsByCategoryQueryVariables
    > &
        (
            | { variables: GetAdsByCategoryQueryVariables; skip?: boolean }
            | { skip: boolean }
        )
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<
        GetAdsByCategoryQuery,
        GetAdsByCategoryQueryVariables
    >(GetAdsByCategoryDocument, options)
}
export function useGetAdsByCategoryLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAdsByCategoryQuery,
        GetAdsByCategoryQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<
        GetAdsByCategoryQuery,
        GetAdsByCategoryQueryVariables
    >(GetAdsByCategoryDocument, options)
}
export function useGetAdsByCategorySuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        GetAdsByCategoryQuery,
        GetAdsByCategoryQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useSuspenseQuery<
        GetAdsByCategoryQuery,
        GetAdsByCategoryQueryVariables
    >(GetAdsByCategoryDocument, options)
}
export type GetAdsByCategoryQueryHookResult = ReturnType<
    typeof useGetAdsByCategoryQuery
>
export type GetAdsByCategoryLazyQueryHookResult = ReturnType<
    typeof useGetAdsByCategoryLazyQuery
>
export type GetAdsByCategorySuspenseQueryHookResult = ReturnType<
    typeof useGetAdsByCategorySuspenseQuery
>
export type GetAdsByCategoryQueryResult = Apollo.QueryResult<
    GetAdsByCategoryQuery,
    GetAdsByCategoryQueryVariables
>
export const GetAdsByTitleDocument = gql`
    query GetAdsByTitle($title: String!) {
        getAdByTitle(title: $title) {
            id
            title
            description
            price
            picture
        }
    }
`

/**
 * __useGetAdsByTitleQuery__
 *
 * To run a query within a React component, call `useGetAdsByTitleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByTitleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByTitleQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetAdsByTitleQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetAdsByTitleQuery,
        GetAdsByTitleQueryVariables
    > &
        (
            | { variables: GetAdsByTitleQueryVariables; skip?: boolean }
            | { skip: boolean }
        )
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetAdsByTitleQuery, GetAdsByTitleQueryVariables>(
        GetAdsByTitleDocument,
        options
    )
}
export function useGetAdsByTitleLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAdsByTitleQuery,
        GetAdsByTitleQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetAdsByTitleQuery, GetAdsByTitleQueryVariables>(
        GetAdsByTitleDocument,
        options
    )
}
export function useGetAdsByTitleSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        GetAdsByTitleQuery,
        GetAdsByTitleQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useSuspenseQuery<
        GetAdsByTitleQuery,
        GetAdsByTitleQueryVariables
    >(GetAdsByTitleDocument, options)
}
export type GetAdsByTitleQueryHookResult = ReturnType<
    typeof useGetAdsByTitleQuery
>
export type GetAdsByTitleLazyQueryHookResult = ReturnType<
    typeof useGetAdsByTitleLazyQuery
>
export type GetAdsByTitleSuspenseQueryHookResult = ReturnType<
    typeof useGetAdsByTitleSuspenseQuery
>
export type GetAdsByTitleQueryResult = Apollo.QueryResult<
    GetAdsByTitleQuery,
    GetAdsByTitleQueryVariables
>
export const GetAdByIdDocument = gql`
    query GetAdById($id: Float!) {
        getAdById(id: $id) {
            id
            title
            description
            location
            owner
            price
            picture
            createdAt
        }
    }
`

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAdByIdQuery(
    baseOptions: Apollo.QueryHookOptions<
        GetAdByIdQuery,
        GetAdByIdQueryVariables
    > &
        (
            | { variables: GetAdByIdQueryVariables; skip?: boolean }
            | { skip: boolean }
        )
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(
        GetAdByIdDocument,
        options
    )
}
export function useGetAdByIdLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAdByIdQuery,
        GetAdByIdQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(
        GetAdByIdDocument,
        options
    )
}
export function useGetAdByIdSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        GetAdByIdQuery,
        GetAdByIdQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(
        GetAdByIdDocument,
        options
    )
}
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>
export type GetAdByIdLazyQueryHookResult = ReturnType<
    typeof useGetAdByIdLazyQuery
>
export type GetAdByIdSuspenseQueryHookResult = ReturnType<
    typeof useGetAdByIdSuspenseQuery
>
export type GetAdByIdQueryResult = Apollo.QueryResult<
    GetAdByIdQuery,
    GetAdByIdQueryVariables
>
export const AddAdDocument = gql`
    mutation AddAd($adData: AdsInput!) {
        AddAd(adData: $adData) {
            title
            owner
            category {
                name
            }
            price
            location
            description
        }
    }
`
export type AddAdMutationFn = Apollo.MutationFunction<
    AddAdMutation,
    AddAdMutationVariables
>

/**
 * __useAddAdMutation__
 *
 * To run a mutation, you first call `useAddAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdMutation, { data, loading, error }] = useAddAdMutation({
 *   variables: {
 *      adData: // value for 'adData'
 *   },
 * });
 */
export function useAddAdMutation(
    baseOptions?: Apollo.MutationHookOptions<
        AddAdMutation,
        AddAdMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<AddAdMutation, AddAdMutationVariables>(
        AddAdDocument,
        options
    )
}
export type AddAdMutationHookResult = ReturnType<typeof useAddAdMutation>
export type AddAdMutationResult = Apollo.MutationResult<AddAdMutation>
export type AddAdMutationOptions = Apollo.BaseMutationOptions<
    AddAdMutation,
    AddAdMutationVariables
>
export const DeleteAdDocument = gql`
    mutation deleteAd($deleteAdId: Float!) {
        deleteAd(id: $deleteAdId)
    }
`
export type DeleteAdMutationFn = Apollo.MutationFunction<
    DeleteAdMutation,
    DeleteAdMutationVariables
>

/**
 * __useDeleteAdMutation__
 *
 * To run a mutation, you first call `useDeleteAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdMutation, { data, loading, error }] = useDeleteAdMutation({
 *   variables: {
 *      deleteAdId: // value for 'deleteAdId'
 *   },
 * });
 */
export function useDeleteAdMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeleteAdMutation,
        DeleteAdMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeleteAdMutation, DeleteAdMutationVariables>(
        DeleteAdDocument,
        options
    )
}
export type DeleteAdMutationHookResult = ReturnType<typeof useDeleteAdMutation>
export type DeleteAdMutationResult = Apollo.MutationResult<DeleteAdMutation>
export type DeleteAdMutationOptions = Apollo.BaseMutationOptions<
    DeleteAdMutation,
    DeleteAdMutationVariables
>
export const GetAllCategoriesDocument = gql`
    query GetAllCategories {
        getAllCategories {
            id
            name
        }
    }
`

/**
 * __useGetAllCategoriesQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
    >(GetAllCategoriesDocument, options)
}
export function useGetAllCategoriesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
    >(GetAllCategoriesDocument, options)
}
export function useGetAllCategoriesSuspenseQuery(
    baseOptions?: Apollo.SuspenseQueryHookOptions<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useSuspenseQuery<
        GetAllCategoriesQuery,
        GetAllCategoriesQueryVariables
    >(GetAllCategoriesDocument, options)
}
export type GetAllCategoriesQueryHookResult = ReturnType<
    typeof useGetAllCategoriesQuery
>
export type GetAllCategoriesLazyQueryHookResult = ReturnType<
    typeof useGetAllCategoriesLazyQuery
>
export type GetAllCategoriesSuspenseQueryHookResult = ReturnType<
    typeof useGetAllCategoriesSuspenseQuery
>
export type GetAllCategoriesQueryResult = Apollo.QueryResult<
    GetAllCategoriesQuery,
    GetAllCategoriesQueryVariables
>
