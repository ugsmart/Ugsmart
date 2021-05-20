import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation Add_User($Name: String!, $Email: String!, $Contact: String!) {
    Add_User(Name: $Name, Email: $Email, Contact: $Contact) {
      _id
      Name
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation Add_Product(
    $Name: String!
    $Category: String!
    $Bater: String!
    $Price: String!
    $Images: Photo
    $usermail: String!
  ) {
    Add_Product(
      Name: $Name
      Category: $Category
      Bater: $Bater
      Price: $Price
      Images: $Images
      usermail: $usermail
    ) {
      _id
    }
  }
`;
