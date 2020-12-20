<script>
	import { getContext, beforeUpdate, onMount, onDestroy } from "svelte";

	export let layers;
	export let mask;
	export let full;
	export let props;
	export let offset;
	const { layerGap, featureHeight } = getContext("stackVars");

	let layerRefs = [];

	function refImages() {
		layerRefs.forEach((layer, index) => {
			layer.style.background = `url(${layers[index]})`;
			layer.style.backgroundSize = "cover";
			layer.style.backgroundPosition = "top center";
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
				layer.style.transition = tops.length === 0 || isBigJump(tops[index], top)
					? "initial"
					: `top ease ${props.easing}`;
				tops[index] = top;
			});
		};
	}

	let updateLayerStyles;
	beforeUpdate(() => {
		if (updateLayerStyles != null) updateLayerStyles();
	});

	onMount(() => {
		updateLayerStyles = layerStyleUpdater();
		refImages();
		console.log("the component has been mounted");
	});

	onDestroy(() => {
		console.log("the component is being destroyed");
	});
</script>

<style>
	.stack {
		width: 100%;
		height: 100%;
		font-size: 3rem;
	}

	.layer,
	.full {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}
	/* 
	.full::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 2rem);
		height: calc(100vh - 2rem);
		background: repeating-linear-gradient(
			-45deg,
			white,
			white 1rem,
			lavender 1rem,
			lavender 2rem
		);
		border: 1rem solid lavender;
		opacity: 1;
	}
	.layer::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 2rem);
		height: calc(100vh - 2rem);
		background: repeating-linear-gradient(
			45deg,
			white,
			white 1rem,
			lavenderblush 1rem,
			lavenderblush 2rem
		);
		border: 1rem solid lavenderblush;
		opacity: 0.7;
	} */
	/* .content {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translate(-50%, 0);
		background: white;
		border: 0.25rem solid;
	}

	.full .content {
		bottom: unset;
		top: 50%;
		transform: translate(-50%, -50%);
		font-size: 9rem;
		border: 1.2rem solid;
	} */
</style>

<section class="stack">
	{#if mask}
		<!-- <div class="full" style="background: url({full});"><span class="content">full {props.id}</span></div> -->
		<div class="full" style="background: url({full});" />
	{/if}
	{#each layers as _, index}
		<div bind:this={layerRefs[index]} class="layer">
			<!-- <span class="content">layer {index}-{props.id}</span> -->
		</div>
	{/each}
</section>
