<script>
	import { getContext, beforeUpdate, onMount, onDestroy } from "svelte";

	export let props;
	const { easing, layerGap } = getContext("stackVars");
	$: offset = props.offset;

	let layerRefs = [];

	function refImages() {
		layerRefs.forEach((layer, index) => {
			layer.appendChild(props.layers[index]);
			// layer.style.background = `url(${layers[index]})`;
			// layer.style.backgroundSize = "cover";
			// layer.style.backgroundPosition = "top center";
		});
	}

	function isBigJump(a, b) {
		const A = Math.abs(Math.max(a, b));
		const B = Math.abs(Math.min(a, b));
		return A - B >= 0.8 * window.innerHeight;
	}

	function layerTop(index) {
		if (offset > index * layerGap) {
			return offset - index * layerGap;
		} else {
			return 0;
		}
	}

	function layerStyleUpdater() {
		const tops = [];
		return () => {
			layerRefs.forEach((layer, index) => {
				const top = layerTop(index);
				layer.style.zIndex = -index;
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
		if (updateLayerStyles != null && props.layers != null) updateLayerStyles();
	});

	onMount(() => {
		updateLayerStyles = layerStyleUpdater();
		//refImages();
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

	.layer img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: auto;
		}
</style>

<div class="stack">
	{#if props.layers != null}
		{#each props.layers as img, index}
			<div bind:this={layerRefs[index]} class="layer"><img src={img.src} alt="fragment"/>
			</div>
		{/each}
	{/if}
</div>
