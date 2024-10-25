import { gql } from 'urql'

export const CreateProjectMutation = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      content
      status
      createdAt
    }
  }
`
