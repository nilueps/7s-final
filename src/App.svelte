<script>
	import { onMount, setContext } from "svelte";
	import About from "./About.svelte";
import Full from "./Full.svelte";
	import Landing from "./Landing.svelte";
	import Page0 from "./Page0.svelte";
	import Page1 from "./Page1.svelte";
	import Page2 from "./Page2.svelte";
	import Page3 from "./Page3.svelte";
	import Page4 from "./Page4.svelte";
	import Page5 from "./Page5.svelte";
	import Page6 from "./Page6.svelte";
	import Section from "./Section.svelte";
import Stack from "./Stack.svelte";

	//
	// component refs
	//
	//
	// asset preload
	//
	const sections = [
		{
			id: 0,
			title: "landing",
			folder: "",
			variation: "full",
			layerCount: 0,
			yScale: 1.0,
			component: Landing
		},
		{
			id: 1,
			title: "berg intro",
			folder: "bergintro",
			isSpecial: false,
			variation: "double",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 2,
			title: "nd vibra",
			folder: "ndvibra",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 3,
			title: "802/Red/B",
			folder: "red",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 4,
			title: "fork razor",
			folder: "forkrazor",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 5,
			title: "4435, 10, upper",
			folder: "covid",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 6,
			title: "ritter, gabo",
			folder: "ritter",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 7,
			title: "memory",
			folder: "memory",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			yScale: 2.0,
		},
		{
			id: 8,
			title: "about",
			folder: "",
			isSpecial: true,
			variation: "full",
			layerCount: 0,
			yScale: 2.0,
			component: About
		},
	];
	//
	// stack vars
	//
	const layerGap = 200;

	function preloadImg(src, cb) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = resolve;
			img.src = src;
			cb(img);
		});
	}

	function preloadAll() {
		const promises = [];
		for (let section of sections) {
			// skip first (landing) and last (about)
			if (section.id === 0 || section.id === sections.length - 1)
				continue;

			const path = `img/${section.id}_${section.folder}/`;
			const fullPath = path + `${section.id}_${section.variation}.png`;
			const setFullProp = (img) => (section.full = img);
			promises.push(preloadImg(fullPath, setFullProp));

			for (let j = 1; j < section.layerCount + 1; j++) {
				const layerPath = path + `${section.id}_${j}.png`;
				if (!section.layers) section.layers = [];
				const setLayerProp = (img) =>
					(section.layers = [...section.layers, img]);
				promises.push(preloadImg(layerPath, setLayerProp));
			}
		}
		return Promise.all(promises);
	}

	//
	// Scrollbar dummy
	//
	const featureH = (i) => sections[i].yScale * window.innerHeight;
	const layersH = (i) => sections[i].layerCount * layerGap;
	const sectionH = (i) => featureH(i) + layersH(i);

	// calculate document height needed for dummy
	const dummyH = sections.reduce((h, _, i) => h + sectionH(i), 0);
	// calculate section thresholds
	const thresholds = []; // populated onMount with section 'tops'
	for (let i = 0, y = 0; y < dummyH; y += sectionH(i), i++) {
		thresholds.push(y);
	}
	//
	// global 	context vars
	//
	const easing = "top ease 200ms"
	setContext("stackVars", { layerGap, thresholds, easing });
	//
	// Scroll logic
	//
	let topProps = sections[0];
	let bottomProps = sections[1];
	
	let ticking = false,
		scrollY = 0,
		topOffset = 0,
		bottomOffset = 0;


	function updateVisibleStacks(indices) {
		topProps = sections[indices[0]];
		bottomProps = sections[indices[1]];
		topProps.offset = topOffset;
		bottomProps.offset = bottomOffset;
	}

	function calcSectionOffsets(indices) {
		topOffset = scrollY - thresholds[indices[0]];
		bottomOffset = topOffset - window.innerHeight;
	}

	function updateStack() {
		ticking = false;
		scrollY = window.scrollY;
		if (!dummyH) return;
		// update visible components
		const tOffset = layerGap; // to swap out the placeholder before reaching the layers
		const isPastThreshold = (threshold) => scrollY <= threshold;
		let idx = thresholds.findIndex((t) => isPastThreshold(t - tOffset));
		if (idx < 1) idx = 1;
		if (idx < 0) idx = sections.length - 1;
		const visibleIndices = [idx - 1, idx];

		calcSectionOffsets(visibleIndices);
		updateVisibleStacks(visibleIndices);
	}

	const handleScroll = (evt) => {
		if (!ticking) requestAnimationFrame(updateStack);
		ticking = true;
	};
</script>

<style>
	.dummy {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: transparent;
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
		@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");

		:root {
			--mainbgcolor: #726665;
		}

		* {
			box-sizing: border-box;
			font-family: "Rubik", monospace;
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
	<Landing text="loading" />
{:then _}
	<div class="dummy" style="height: {dummyH}px">
		<div class="top">
			{#if topProps.component != null}
				<svelte:component this={topProps.component}/>
			{:else}
				<Stack props={topProps}/>
			{/if}
		</div>
		<div class="bottom">
			{#if bottomProps.component != null}
				<svelte:component this={bottomProps.component}/>
			{:else}
				<Full props={bottomProps}/>
			{/if}
		</div>
	</div>
{/await}
