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
export const EDIT_PRODUCT = gql`
  mutation Edit_Product(
    $Name: String!
    $Category: String!
    $Description: String!
    $Bater: String!
    $Price: String!
    $Image: Photo!
    $id: String!
  ) {
    Edit_Product(
      Name: $Name
      Category: $Category
      Description: $Description
      Bater: $Bater
      Price: $Price
      Image: $Image
      id: $id
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
    $Name: String!
    $College: String!
    $Card: String!
    $Transcript: String!
    $Price: String!
    $Duration: String!
    $Image: String!
    $usermail: String!
  ) {
    Add_Tutor(
      Program: $Program
      Description: $Description
      Name: $Name
      College: $College
      Card: $Card
      Transcript: $Transcript
      Price: $Price
      Duration: $Duration
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
export const EDIT_TUTOR = gql`
  mutation Edit_Profile(
    $Program: String!
    $Description: String!
    $Price: String!
    $Image: String!
    $College: String!
    $id: String!
  ) {
    Edit_Profile(
      Program: $Program
      Description: $Description
      Price: $Price
      Image: $Image
      College: $College
      id: $id
    ) {
      _id
    }
  }
`;
export const DELETE_TUTOR = gql`
  mutation Delete_Tutor($email: String!) {
    Delete_Tutor(email: $email) {
      _id
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation Delete_Product($id: String!) {
    Delete_Product(id: $id) {
      _id
    }
  }
`;
export const RATE_PRODUCT = gql`
  mutation Rate_Product(
    $value: Int!
    $comment: String!
    $username: String!
    $usermail: String!
    $date: String!
    $Product_id: String!
  ) {
    Rate_Product(
      value: $value
      comment: $comment
      username: $username
      usermail: $usermail
      date: $date
      Product_id: $Product_id
    ) {
      _id
    }
  }
`;
export const RATE_TUTOR = gql`
  mutation Rate_Tutor(
    $value: Int!
    $comment: String!
    $username: String!
    $usermail: String!
    $date: String!
    $Tutor_id: String!
  ) {
    Rate_Tutor(
      value: $value
      comment: $comment
      username: $username
      usermail: $usermail
      date: $date
      Tutor_id: $Tutor_id
    ) {
      _id
    }
  }
`;
