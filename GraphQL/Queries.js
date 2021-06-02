import { gql } from "@apollo/client";

export const GET_TUTORS = gql`
  query {
    Tutors {
      _id
      Program
      Description
      Name
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
      Images
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
      usermail
    }
    Profile(user: $user) {
      _id
      Name
    }
  }
`;
