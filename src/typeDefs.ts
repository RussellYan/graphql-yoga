export const typeDefs = /* GraphQL */ `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  type User {
    userId: Int!
    access: String
    email: String
    avatar: String
    country: String
    name: String
  }

  # the schema allows the following query:
  type Query {
    hello: String
    posts: [Post]
    author(id: Int!): Author
  }

  type LoginReturn {
    userId: String
    name: String
    access: String
    token: String
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: Int!): Post
    login(name: String, password: String): LoginReturn
  }
`
