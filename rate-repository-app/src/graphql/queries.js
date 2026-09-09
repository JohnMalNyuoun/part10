import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
          fullName
          url
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query getCurrentUser {
    me {
      id
      username
    }
  }
`;
