import { gql } from "@apollo/client";

export const GET_TUTORS = gql`
  query {
    Tutors {
      _id
      Program
      Description
      Name
      College
      Card
      Transcript
      Approved
      Price
      Image
      usermail
    }
  }
`;

export const GET_APPROVED_TUTORS = gql`
  query {
    Approved_tutors {
      _id
      Program
      Description
      Name
      College
      Card
      Transcript
      Approved
      Price
      Image
      usermail
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    Products {
      _id
      Name
      Category
      Bater
      Description
      Price
      Images {
        Image1
        Image2
        Image3
      }
      usermail
      createdAt
    }
  }
`;

export const GET_EVENTS = gql`
  query {
    Events {
      _id
      Name
      Category
      Description
      Price
      Time
      Date
      Flyer
      usermail
      createdAt
    }
  }
`;

export const GET_PRODUCT_CATEGORY = gql`
  query Product_Cate($cate: String!) {
    Product_Cate(cate: $cate) {
      _id
      Name
      Category
      Bater
      Price
      Images {
        Image1
        Image2
        Image3
      }
      usermail
      createdAt
    }
  }
`;
export const GET_PROFILE = gql`
  query Profile($user: String!) {
    Profile(user: $user) {
      _id
      Tutor
    }
  }
`;
export const MY_EVENTS = gql`
  query User_Event($user: String!) {
    User_Event(user: $user) {
      _id
      Name
      Category
      Description
      Price
      Time
      Date
      Flyer
      usermail
      createdAt
    }
  }
`;
export const GET_EVENTS_CATEGORY = gql`
  query Event_Cate($cate: String!) {
    Event_Cate(cate: $cate) {
      _id
      Name
      Category
      Description
      Date
      Price
      Time
      Flyer
      usermail
      createdAt
    }
  }
`;
export const GET_TUTOR = gql`
  query ($user: String!) {
    User_Tutor(user: $user) {
      _id
      Program
      Name
      Description
      Price
      Image
      College
      Card
      Transcript
      Approved
      usermail
    }
    Profile(user: $user) {
      _id
      Name
    }
  }
`;
export const GET_TUTOR_COL = gql`
  query College($college: String!) {
    College(college: $college) {
      _id
      Program
      Description
      Price
      Image
      College
      Name
      usermail
    }
  }
`;
export const MY_PRODUCTS = gql`
  query User_Product($user: String!) {
    User_Product(user: $user) {
      _id
      Name
      Category
      Description
      Bater
      Price
      Images {
        Image1
        Image2
        Image3
      }
      usermail
      createdAt
    }
  }
`;
export const PROFILE_NAME = gql`
  query Profile($user: String!) {
    Profile(user: $user) {
      _id
      Name
    }
  }
`;
export const P_REVIEWS = gql`
  query P_reviews($id: String!) {
    P_reviews(id: $id) {
      _id
      value
      comment
      date
      username
      usermail
      Product_id
    }
  }
`;
export const T_REVIEWS = gql`
  query T_reviews($id: String!) {
    T_reviews(id: $id) {
      _id
      value
      comment
      date
      username
      usermail
      Tutor_id
    }
  }
`;
