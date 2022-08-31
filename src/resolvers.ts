import { find, filter } from 'lodash'

export const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' }
]

export const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
]

export const users = [
  {
    userId: 1,
    access: 'admin',
    email: 'abc@gmail.com',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    country: 'China',
    name: 'Russell Yan',
    password: 'abc.123'
  },
  {
    userId: 2,
    access: 'user',
    email: 'abc@gmail.com',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    country: 'China',
    name: 'Huage',
    password: 'abc.1234'
  },
]

export const resolvers = {
  Query: {
    hello: () => 'welcome to yoga',
    // 客户端查询string
    // query {
    //   posts {
    //     id
    //     title
    //   }
    // }
    posts: () => posts,
    // query {
    //   author(id: 1) {
    //     lastName
    //     firstName
    //   }
    // }
    author: (_: any, { id }: any) => {
      const author = find(authors, { id })
      console.log('author: ', author)
      return author
    },
  },
  Mutation: {
    // 客户端查询string
    // mutation {
    //   upvotePost(postId: 1) {
    //     id
    //     votes
    //   }
    // }
    upvotePost: (_: any, { postId }: any, ctx: any) => {
      console.log('context: ', ctx.token, ctx?.req?.headers)
      const post = find(posts, { id: postId })
      if (!post) return null
      post.votes += 1
      return post
    },
    login: (_: any, { name, password }: any, ctx: any) => {
      const user = find(users, { name, password })
      if (!user) return null
      return {
        userId: user.userId,
        name,
        access: user.access,
        token: 'token_113421234'
      }
    }
  },

  // 客户端查询string
  // {
  //   author(id: 2) {
  //     posts {
  //       id
  //       title
  //     }
  //   }
  // }
  Author: {
    posts: (author: any) => filter(posts, { authorId: author.id })
  },

  Post: {
    author: (post: any) => find(authors, { id: post.authorId })
  }
}