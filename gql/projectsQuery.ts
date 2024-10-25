import { gql } from 'urql'

export const ProjectsQuery = gql`
  query {
    projects {
      id
      name
      content
      status
      createdAt
    }
  }
`
