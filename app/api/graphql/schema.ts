const schema = `#graphql

type User {
  id: ID!
  email: String!
  createdAt: String!
  token: String
  issues: [Issue]!
}

enum IssueStatus {
  BACKLOG
  TODO
  INPROGRESS
  DONE
}

type Issue {
  id: ID!
  createdAt: String!
  userId: String!
  user: User!
  status: IssueStatus
  content: String!
  name: String!
}

input AuthInput {
  email: String!
  password: String!
}


input CreateIssueInput {
  name: String!
  content: String!
  status: IssueStatus
}

input EditIssueInput {
  name: String
  content: String
  status: IssueStatus
  id: ID!
}

input IssuesFilterInput {
  statuses: [IssueStatus]
}

type Project {
  id: ID!
  name: String!
  content: String!
  status: ProjectStatus!
  createdAt: String!
}

enum ProjectStatus {
  BACKLOG
  INPROGRESS
  DONE
}

input CreateProjectInput {
  name: String!
  content: String!
  status: ProjectStatus
}

input EditProjectInput {
  name: String
  content: String
  status: ProjectStatus
  id: ID!
}

type Query {
  me: User
  issues(input: IssuesFilterInput): [Issue]!
  projects: [Project]!
}

type Mutation {
  deleteIssue(id: ID!): ID!
  createIssue(input: CreateIssueInput!): Issue!
  editIssue(input: EditIssueInput!): Issue!
  createUser(input: AuthInput!): User
  signin(input: AuthInput!): User
  createProject(input: CreateProjectInput!): Project!
  editProject(input: EditProjectInput!): Project!
}

mutation {
  createProject(input: {
    name: "Test Project",
    content: "This is a test project",
    status: BACKLOG
  }) {
    id
    name
    content
    status
    createdAt
  }
}

`

export default schema
