<script>
	import { onMount, setContext } from "svelte";
	import About from "./About.svelte";
	import Full from "./Full.svelte";
	import Landing from "./Landing.svelte";
	import Stack from "./Stack.svelte";

	//
	// component refs
	//
	const sections = [
		{
			id: 0,
			title: "landing",
			folder: "",
			variation: "full",
			layerCount: 0,
			fullScale: 1,
			component: Landing,
		},
		{
			id: 1,
			title: "berg intro",
			folder: "bergintro",
			isSpecial: false,
			variation: "double",
			layerCount: 7,
			fullScale: 2.0,
		},
		{
			id: 2,
			title: "nd vibra",
			folder: "ndvibra",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
		},
		{
			id: 3,
			title: "802/Red/B",
			folder: "red",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
		},
		{
			id: 4,
			title: "fork razor",
			folder: "forkrazor",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
		},
		{
			id: 5,
			title: "4435, 10, upper",
			folder: "covid",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
		},
		{
			id: 6,
			title: "ritter, gabo",
			folder: "ritter",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
		},
		{
			id: 7,
			title: "memory",
			folder: "memory",
			isSpecial: false,
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
		},
		{
			id: 8,
			title: "about",
			folder: "",
			isSpecial: true,
			variation: "full",
			layerCount: 0,
			fullScale: 1.0,
			component: About,
		},
	];

	//
	// asset preload
	//
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
			section.full = null;
			promises.push(preloadImg(fullPath, setFullProp));

			section.layers = [];
			for (let j = 1; j < section.layerCount + 1; j++) {
				const layerPath = path + `${section.id}_${j}.png`;
				const setLayerProp = (img) =>
					(section.layers = [...section.layers, img]);
				promises.push(preloadImg(layerPath, setLayerProp));
			}
		}
		return Promise.all(promises);
	}

	//
	// global 	context vars
	//
	const layerGap = 200;
	const easing = "top ease 300ms";
	setContext("stackVars", { layerGap, easing });

	//
	// Scrollbar dummy
	//
	const fullH = (i) => sections[i].fullScale * window.innerHeight;
	const stackH = (i) => sections[i].layerCount * layerGap;//sections[i].layerCount > 0 ? window.innerHeight : 0;
	const sectionH = (i) => fullH(i) + stackH(i);


	// calculate section thresholds
	const sectionThresholds = []; // populated onMount with section 'tops'
	let runningTop = 0;
	for (let section of sections) {
		section.fullTop = runningTop;
		section.stackTop = section.fullTop + fullH(section.id) - window.innerHeight;
		section.sectionH = sectionH(section.id);
		sectionThresholds.push(runningTop);
		runningTop += section.sectionH - window.innerHeight//= section.stackTop + stackH(section.id);
	}
	console.log(sectionThresholds)
	// calculate document height needed for dummy
	const dummyH = runningTop// sections.reduce((h, s, i) => h + s.sectionH, 0);
	
	//
	// Scroll logic
	//

	let ticking = false,
		scrollY = 0;

	let topSectionIdx = 0;
	let bottomSectionIdx = 1;

	function updateVisibleSections(indices) {
		topSectionIdx = indices[0];
		bottomSectionIdx = indices[1];
	}

	function updateStack() {
		ticking = false;
		scrollY = window.scrollY;
		if (!dummyH) return;
		// compute visible components
		const tOffset = 0;//layerGap; // to swap out the placeholder before reaching the layers
		const isPastThreshold = (threshold) => scrollY <= threshold;
		let idx = sectionThresholds.findIndex((t) => isPastThreshold(t - tOffset));
		console.log(scrollY, idx, sectionThresholds[idx])
		if (idx < 1) idx = 1;
		if (idx < 0) idx = sections.length - 1;
		updateVisibleSections([idx - 1, idx]);
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
			{#if sections[topSectionIdx].component != null}
				<svelte:component this={sections[topSectionIdx].component} />
			{:else}
				<Stack section={sections[topSectionIdx]} {scrollY} />
			{/if}
		</div>
		<div class="bottom">
			{#if sections[bottomSectionIdx].component != null}
				<svelte:component this={sections[bottomSectionIdx].component} />
			{:else}
				<Full section={sections[bottomSectionIdx]} {scrollY} />
			{/if}
		</div>
	</div>
{/await}
