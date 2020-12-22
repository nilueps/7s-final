<script>
	import { getContext, beforeUpdate, onMount } from "svelte";

	export let section;
	export let scrollY;
	const { easing, layerGap } = getContext("stackVars");

	let layerRefs = [];

	function isBigJump(a, b) {
		const A = Math.abs(Math.max(a, b));
		const B = Math.abs(Math.min(a, b));
		return A - B >= 0.8 * window.innerHeight;
	}

	function layerTop(index) {
		return section.stackTop + index * layerGap;
	}

	function layerStyleUpdater() {
		const tops = [];
		return () => {
			//const y = scrollY;
			layerRefs.forEach((layer, index) => {
				let top = scrollY - layerTop(index);
				if (top < 0) top = 0;
				// else top = window.innerHeight;
				layer.style.top = -top + "px";
				layer.style.transition =
					tops.length === 0 || isBigJump(tops[index], top)
						? "initial"
						: easing;
				tops[index] = top;
			});
		};
	}

	let updateLayerStyles;
	beforeUpdate(() => {
		if (updateLayerStyles != null && section.layers != null)
			updateLayerStyles();
	});

	onMount(() => {
		updateLayerStyles = layerStyleUpdater();
	});
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
	}
	.layer > img {
		position: absolute;
		top: 0;
		left: 0;
	}
/* 
	.layer img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	} */
</style>

<div id="stack" class="stack">
	{#if section.layers != null}
		{#each section.layers as img, index}
			<div bind:this="{layerRefs[index]}" class="layer" style="z-index: {-index};">
				<img width="100%" height="100%" src={img.src} alt="fragment" />
			</div>
		{/each}
	{/if}
</div>
