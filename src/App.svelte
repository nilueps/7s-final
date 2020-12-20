<script>
	import { onMount, setContext } from "svelte";
	import Landing from "./Landing.svelte";
	import Page0 from "./Page0.svelte";
	import Page1 from "./Page1.svelte";
	import Page2 from "./Page2.svelte";
	import Page3 from "./Page3.svelte";
	import Page4 from "./Page4.svelte";
	import Page5 from "./Page5.svelte";
	import Page6 from "./Page6.svelte";

	//
	// stack vars
	//
	const layerGap = 200;
	const featureHeight = 1.2;
	setContext("stackVars", { layerGap, featureHeight });

	//
	// component refs
	//
	const stacks = [Landing, Page0, Page1, Page2, Page3, Page4, Page5, Page6];
	const layerCounts = [0, 7, 7, 7, 7, 7, 7, 7];
	const sections = stacks.length;
	const thresholds = []; // populated onMount with section 'tops'

	let topStack = stacks[0];
	let topProps = {
		id: 0,
		easing: "200ms",
	};
	let bottomStack = stacks[1];
	let bottomProps = {
		id: 1,
		easing: "",
	};
	//
	// Scroll logic
	//
	let ticking = false,
		scrollY = 0,
		topOffset = 0;

	function updateVisibleStacks(indices) {
		topStack = stacks[indices[0]];
		bottomStack = stacks[indices[1]];
		topProps.id = indices[0];
		bottomProps.id = indices[1];
	}

	function calcSectionOffset(currentOffset) {
		topOffset = currentOffset;
	}

	function updateStack() {
		ticking = false;
		if (!dummyH) return;
		// update visible components
		const isPastThreshold = (threshold) => scrollY <= threshold;
		let idx = thresholds.findIndex(isPastThreshold);
		if (idx < 1) idx = 1;
		if (idx < 0) idx = stacks.length - 1;
		const visibleIndices = [idx - 1, idx];

		updateVisibleStacks(visibleIndices);
		calcSectionOffset(scrollY - thresholds[visibleIndices[0]]);
	}

	const handleScroll = (evt) => {
		scrollY = window.scrollY;
		if (!ticking) requestAnimationFrame(updateStack);
		ticking = true;
	};

	//
	// Scrollbar dummy
	//
	let dummy, dummyH;

	onMount(() => {
		const featureH = window.innerHeight * featureHeight;
		// calculate document height needed for dummy
		dummyH =
			featureH * (sections + 1) +
			layerCounts.reduce((s, v) => s + v * layerGap);
		dummy.style.height = dummyH + "px";
		// calculate section thresholds
		for (
			let i = 0, y = 0;
			y < dummyH;
			y += featureH + layerCounts[i] * layerGap, i++
		) {
			thresholds.push(y);
		}
	});
</script>

<style>
	.dummy {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: repeating-linear-gradient(
			45deg,
			white,
			white 1rem,
			aliceblue 1rem,
			aliceblue 2rem
		);
		border: 1rem solid aliceblue;
	}

	.top,
	.bottom {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}

	.top {
		z-index: 2;
	}

	.bottom {
		z-index: 1;
	}
</style>

<svelte:head>
	<style>
		@import url("https://dev-cats.github.io/code-snippets/JetBrainsMono.css");

		:root {
			--mainbgcolor: #726A6A
		}

		* {
			box-sizing: border-box;
			font-family: "JetBrains Mono";
			line-height: 1.2;
			margin: 0;
			padding: 0;
		}

		html,
		body {
			font-size: 100%;
		}
	</style>
</svelte:head>
<svelte:window on:scroll={handleScroll} />
<div bind:this={dummy} class="dummy">
	<div class="top">
		<svelte:component
			this={topStack}
			offset={topOffset}
			props={topProps}
			mask={false} />
	</div>
	<div class="bottom">
		<svelte:component
			this={bottomStack}
			offset={0}
			props={bottomProps}
			mask={true} />
	</div>
</div>
