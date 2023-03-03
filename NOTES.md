# NOTES

- [Houdini - Setting Up Your Project](https://www.houdinigraphql.com/guides/setting-up-your-project)

```shell
$ npm create svelte@latest sveltekit-ts-houdini-subscription
$ npx houdini@latest init
```

## Error generating $houdini folder and runtime

```shell
Internal server error: Failed to load url /$houdini/plugins/houdini-svelte/runtime/session (resolved id: /$houdini/plugins/houdini-svelte/runtime/session) in /src/routes/+layout.server.js. Does the file exist?
```

> empty runtime $houdini folder

> debug with `npx houdini generate -v`

the problem is a bad used subscription, without a name 
houdini required named queries, mutations and subscriptions

bad subscription, that causes `pnpm dev`, and houdini requires a non error boot to create `$houdini` and runtime

```gql
const updates = graphql(`
	subscription NewGoods {
		...
	}
`);
```

```gql
const updates = graphql(`
	subscription NewGoods {
		goodCreated {
			event
			timestamp
			createdGood {
				id
				name
			}
		}
	}
`);
```

> tip uses a dummy `src/routes/+page.svelte` ex

<h1>clean boot</h1>

## Never imports from 'houdini'

> tip: your client file imports from `houdini`, it needs to import from `$houdini`

KO: `import { HoudiniClient, subscription } from 'houdini'`
OK: `import { HoudiniClient, subscription } from '$houdini'`

> NEVER IMPORT FROM 'houdini', always from '$houdini'