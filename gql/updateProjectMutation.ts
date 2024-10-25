import { gql } from 'urql'

export const EditProjectMutation = gql`
  mutation EditProject($input: EditProjectInput!) {
    editProject(input: $input) {
      createdAt
      id
      name
      status
    }
  }
`
