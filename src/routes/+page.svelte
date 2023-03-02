<script lang="ts">
	import { graphql } from '$houdini';

	// this information should usually come from a fragment
	export let itemID: string;

	// will start listening onMount (browser only)
	const updates = graphql(`
		subscription ItemUpdate($id: ID!) {
			itemUpdate(id: $id) {
				item {
					id
					completed
					text
				}
			}
		}
	`);

	$: updates.listen({ id: itemID });
</script>

latest value: {$updates.itemUpdate.item.text}
