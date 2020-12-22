<script>
	import { getContext, beforeUpdate, onMount } from "svelte";

	export let section;
	export let scrollY;
	const { easing, layerGap } = getContext("stackVars");

	let stack;
	let layerRefs = [];

	$:images = section.layers;

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
			stack.childNodes.forEach((layer, index) => {
				layer.style.zIndex = -index;
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
		if (stack != null) {
			if (stack.hasChildNodes) {
						if (stack.firstChild != images[0]) {
							const current = stack.childNodes
							for (let [i, image] of images.entries()) {
								stack.replaceChild(image, current[i]);
							}
						}
					} else {
						for (let image of images) {
							stack.appendChild(image);
						}
					}
		}
		
		if (updateLayerStyles != null && section.layers != null)
			updateLayerStyles();
	});	

	onMount(() => {
		images.forEach((image) => stack.appendChild(image))
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
</style>

<div bind:this="{stack}" id="stack" class="stack">
	<!-- {#if section.layers != null}
		{#each section.layers as Img, index}
			<div bind:this="{layerRefs[index]}" class="layer" style="z-index: {-index};">
				<Img />
			</div>
		{/each}
	{/if} -->
</div>
