# NOTES

- [Houdini - Setting Up Your Project](https://www.houdinigraphql.com/guides/setting-up-your-project)

```shell
$ npm create svelte@latest sveltekit-ts-houdini-subscription
$ pnpm add houdini houdini-svelte graphql graphql-ws
```


Internal server error: Failed to load url /$houdini/plugins/houdini-svelte/runtime/session (resolved id: /$houdini/plugins/houdini-svelte/runtime/session) in /src/routes/+layout.server.js. Does the file exist?

create a dummy `src/routes/+page.gql`

query{
  goods{
    id
    name
  }
}


empty runtime $houdini folder

debug with `npx houdini generate -v`


the problem is a named required in subscription 

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



your client file imports from houdini
it needs to import from $houdini

KO
  import { HoudiniClient, subscription } from 'houdini'

OK
  import { HoudiniClient, subscription } from '$houdini'  

  