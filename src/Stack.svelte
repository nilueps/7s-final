<script>
	import { getContext } from "svelte";

	export let section;
	export let scrollY;
	export let newSection;
	const { easing, layerGap } = getContext("stackVars");
	$: images = section.layers;
	$: transition = newSection ? "initial" : easing;

	function layerTop(n) {
		return section.stackTop + n * layerGap;
	}

	function layerStyleUpdater(node, scrollY) {
		return {
			update: (scrollY) => {
				const id = node.dataset.id;
				const threshold = layerTop(id);
				let top = scrollY - threshold;
				if (top < 0) top = 0;
				node.style.transition = transition;
				node.style.top = -top + "px";
			},
		};
	}
</script>

<style>
	.stack {
		width: 100%;
		height: 100%;
		font-size: 3rem;
	}

	.layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		transition: "initial";
	}
	.layer > img {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

<div id="stack" class="stack">
	{#if images != null}
		{#each images as img, index}
			<div
				use:layerStyleUpdater={scrollY}
				data-id={index}
				class="layer"
				style="z-index: {-index};">
				<img width="100%" height="100%" src={img.src} alt="fragment" />
			</div>
		{/each}
	{/if}
</div>
