import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($id: Float!) {
    getAdById(id: $id) {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_BY_TITLE = gql`
  query GetAdByTitle($title: String!) {
    getAdByTitle(title: $title) {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ADS_BY_CATEGORY = gql`
  query GetAdsByCategory($name: String!) {
    getAdsByCategory(name: $name) {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ADS_BY_TAG = gql`
  query GetAdsByTag($name: String!) {
    getAdsByTag(name: $name) {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const ADD_AD = gql`
  mutation AddAd($adData: AdsInput!) {
    AddAd(adData: $adData) {
      id
      title
      description
      owner
      price
      picture
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($id: Float!) {
    deleteAd(id: $id)
  }
`;
