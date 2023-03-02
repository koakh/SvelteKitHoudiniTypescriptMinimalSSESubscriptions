// Using graphql-ws

// import { createClient } from 'graphql-ws';
// // TODO: never import from 'houdini', always from '$houdini'
// // with this change we see in console `client.mjs:141 WebSocket connection to 'ws://localhost:5000/graphql' failed: `
// // import { HoudiniClient, subscription } from 'houdini';
// import { HoudiniClient, subscription } from '$houdini';

// export default new HoudiniClient({
// 	url: 'ws://localhost:5000/graphql',
// 	plugins: [
// 		subscription(() => createClient({
// 			url: 'ws://localhost:5000/graphql',
// 		}))
// 	]
// })

// import { SubscriptionClient } from 'subscriptions-transport-ws'
// import { browser } from '$app/environment'
import { HoudiniClient, subscription } from '$houdini';

function sseSockets() {
  return {
    subscribe(payload, handlers) {
      const url = new URL('/graphql', 'http://localhost:5000');
      url.searchParams.append('query', payload.query);
      url.searchParams.append('variables', JSON.stringify(payload.variables));

      const eventSource = new EventSource(url);
			console.log(`connect to ${url}`);

      eventSource.addEventListener('message', (ev) => handlers.next(JSON.parse(ev.data)));

      return () => eventSource.close();
    },
  }
}

export default new HoudiniClient({
  url: "http://localhost:5000/graphql",
  plugins: [
    subscription(sseSockets)
  ]
})