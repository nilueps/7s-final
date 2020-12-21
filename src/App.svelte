<script>
	import { onMount, setContext } from "svelte";
	import About from "./About.svelte";
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
	const featureScale = 1.0;
	setContext("stackVars", { layerGap, featureScale });

	//
	// component refs
	//
	const stacks = [
		Landing,
		Page0,
		Page1,
		Page2,
		Page3,
		Page4,
		Page5,
		Page6,
		About,
	];
	const titles = [
		"berg intro",
		"nd vibra",
		"802/Red/B",
		"fork razor",
		"4435, 10, upper",
		"ritter, gabo",
		"memory",
		"about",
	];
	//
	// asset preload
	//
	const folders = [
		"bergintro",
		"ndvibra",
		"red",
		"forkrazor",
		"covid",
		"ritter",
		"memory",
	];
	const layerCounts = [0, 7, 7, 7, 7, 7, 7, 7, 0];
	const featureScales = [1.0, 2, 2, 2, 2, 2, 2, 2, 2];

	function preloadImg(src) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = resolve;
			img.src = src;
		});
	}

	function preloadAll() {
		const promises = [];
		for (let [i, folder] of folders.entries()) {
			const n = i + 1;
			const path = `img/${n}_${folder}/`;
			const full = path + `${n}_full.png`;
			promises.push(preloadImg(full));
			for (let j = 1; j < layerCounts[n] + 1; j++) {
				const layer = path + `${n}_${j}.png`;
				promises.push(preloadImg(layer));
			}
		}
		return Promise.all(promises);
	}

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
	// Scrollbar dummy
	//
	const featureH = (i) => featureScales[i] * window.innerHeight;
	const layersH = (i) => layerCounts[i] * layerGap;
	const sectionH = (i) => featureH(i) + layersH(i);

	// calculate document height needed for dummy
	const dummyH = stacks.reduce((s, _, i) => s + sectionH(i), 0);
	console.log(dummyH)

	// calculate section thresholds
	const thresholds = []; // populated onMount with section 'tops'
	for (let i = 0, y = 0; y < dummyH; y += sectionH(i), i++) {
		thresholds.push(y);
	}

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
		const tOffset = layerGap;
		const isPastThreshold = (threshold) => scrollY <= threshold - tOffset;
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

</script>

<style>
	.loading {

	}

	.dummy {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: transparent;
		/* background: repeating-linear-gradient(
			45deg,
			white,
			white 1rem,
			aliceblue 1rem,
			aliceblue 2rem
		);
		border: 1rem solid aliceblue; */
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
		@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
		@import url("https://dev-cats.github.io/code-snippets/JetBrainsMono.css");

		:root {
			--mainbgcolor: #726665;
		}

		* {
			box-sizing: border-box;
			font-family: "Rubik", "JetBrains Mono", monospace;
			line-height: 1.2;
			margin: 0;
			padding: 0;
		}

		html,
		body {
			font-size: 100%;
			background: var(--mainbgcolor);
		}
	</style>
</svelte:head>
<svelte:window on:scroll={handleScroll} />
{#await preloadAll()}
	<Landing text="loading"/>
{:then _}
	<div class="dummy" style="height: {dummyH}px">
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
{/await}
