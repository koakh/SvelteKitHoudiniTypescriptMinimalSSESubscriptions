<script lang="ts">
	import { graphql } from '$houdini';

	// will start listening onMount (browser only)
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

	$: updates.listen();
  $: console.log(`$updates.data.goodCreated: [${JSON.stringify($updates.data?.goodCreated, undefined, 2)}]`);
</script>

latest value: {$updates.data?.goodCreated.createdGood.id}
