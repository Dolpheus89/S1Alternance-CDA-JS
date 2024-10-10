import { gql } from "graphql-tag";

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: Float!) {
    getUserById(id: $id) {
      id
      email
      role
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $role: String!) {
    createUser(email: $email, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
