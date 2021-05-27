import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Add_User($Name: String!, $Email: String!, $Contact: String!) {
    Add_User(Name: $Name, Email: $Email, Contact: $Contact) {
      _id
      Name
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation Add_Product(
    $Name: String!
    $Category: String!
    $Description: String!
    $Bater: String!
    $Price: String!
    $Images: Photo
    $usermail: String!
  ) {
    Add_Product(
      Name: $Name
      Category: $Category
      Description: $Description
      Bater: $Bater
      Price: $Price
      Images: $Images
      usermail: $usermail
    ) {
      _id
    }
  }
`;
export const ADD_EVENT = gql`
  mutation Add_Event(
    $Name: String!
    $Category: String!
    $Description: String!
    $Price: String!
    $Time: String!
    $Date: String!
    $Flyer: String!
    $usermail: String!
  ) {
    Add_Event(
      Name: $Name
      Category: $Category
      Description: $Description
      Price: $Price
      Time: $Time
      Date: $Date
      Flyer: $Flyer
      usermail: $usermail
    ) {
      _id
    }
  }
`;
export const ADD_TUTOR = gql`
  mutation Add_Tutor(
    $Program: String!
    $Description: String!
    $Price: String!
    $Image: String!
    $usermail: String!
  ) {
    Add_Tutor(
      Program: $Program
      Description: $Description
      Price: $Price
      Image: $Image
      usermail: $usermail
    ) {
      _id
    }
  }
`;
export const STATUS_CHANGE = gql`
  mutation Status_change($status: Boolean!, $user: String!) {
    Status_change(status: $status, user: $user) {
      _id
    }
  }
`;
export const DELETE_EVENT = gql`
  mutation Delete_Event($id: String!) {
    Delete_Event(id: $id) {
      _id
    }
  }
`;
export const EDIT_EVENT = gql`
  mutation Edit_Event(
    $Name: String!
    $Category: String!
    $Description: String!
    $Price: String!
    $Date: String!
    $Time: String!
    $Flyer: String!
    $id: String!
  ) {
    Edit_Event(
      Name: $Name
      Category: $Category
      Description: $Description
      Price: $Price
      Date: $Date
      Time: $Time
      Flyer: $Flyer
      id: $id
    ) {
      _id
    }
  }
`;
