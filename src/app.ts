import http from 'http'
import { createServer } from '@graphql-yoga/node'
import { schema } from './schema'

const server = createServer({
  schema,
  context: ({req, res, ...rest }) => {
    const token = req.headers.token || 'holy-shit'
    return { ...rest, req, res, token }
  }
})

server.start()
