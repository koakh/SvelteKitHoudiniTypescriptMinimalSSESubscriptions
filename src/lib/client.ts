import { createClient } from 'graphql-ws'
import { HoudiniClient, subscription } from 'houdini'

export default new HoudiniClient({
  url: "...",
  plugins: [
    subscription(() => createClient({
      url: 'ws://api.url'
    }))
  ]
})