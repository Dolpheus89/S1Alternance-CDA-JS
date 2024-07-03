import { gql } from "@apollo/client"

export const GET_ALL_ADS_QUERY = gql`
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

export const GET_ADS_BY_CATEGORY_QUERY = gql`
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

export const GET_ADS_BY_TITLE_QUERY = gql`
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

export const GET_ADS_BY_ID_QUERY = gql`
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
