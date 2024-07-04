/* eslint-disable */
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
