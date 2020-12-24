<script>
	import { setContext } from "svelte";

	import Stack from "./Stack.svelte";
	import Full from "./Full.svelte";

	import Loading from "./Loading.svelte";
	import Landing from "./Landing.svelte";
	import Page1 from "./Page1.svelte";
	import Page2 from "./Page2.svelte";
	import Page3 from "./Page3.svelte";
	import Page4 from "./Page4.svelte";
	import Page5 from "./Page5.svelte";
	import Page6 from "./Page6.svelte";
	import Page7 from "./Page7.svelte";
	import About from "./About.svelte";

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
			fullScale: 0.5,
			component: Landing,
		},
		{
			id: 1,
			title: "berg intro",
			folder: "bergintro",
			variation: "triple",
			layerCount: 7,
			fullScale: 3.0,
			content: Page1,
		},
		{
			id: 2,
			title: "nd vibra",
			folder: "ndvibra",
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
			content: Page2,
		},
		{
			id: 3,
			title: "802/Red/B",
			folder: "red",
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
			content: Page3,
		},
		{
			id: 4,
			title: "fork razor",
			folder: "forkrazor",
			variation: "full",
			layerCount: 8,
			fullScale: 1.0,
			content: Page4,
		},
		{
			id: 5,
			title: "4435, 10, upper",
			folder: "covid",
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
			content: Page5,
		},
		{
			id: 6,
			title: "ritter, gabo",
			folder: "ritter",
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
			content: Page6,
		},
		{
			id: 7,
			title: "memory",
			folder: "memory",
			variation: "full",
			layerCount: 7,
			fullScale: 1.0,
			content: Page7,
		},
		{
			id: 8,
			title: "about",
			folder: "",
			variation: "full",
			layerCount: 0,
			fullScale: 2.0,
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
	const layerGap = 40;
	const easing = "top 300ms cubic-bezier(.55,.06,.68,.19) 0s";
	setContext("stackVars", { layerGap, easing });

	//
	// Scrollbar dummy
	//
	const fullH = (i) => sections[i].fullScale * window.innerHeight;
	const stackH = (i) => sections[i].layerCount * layerGap; //sections[i].layerCount > 0 ? window.innerHeight : 0;

	// calculate section thresholds
	const sectionThresholds = []; // populated with section 'tops'
	let runningTop = 0;
	for (let section of sections) {
		section.fullTop = runningTop;
		section.stackTop =
			section.fullTop + fullH(section.id) - window.innerHeight;
		runningTop = section.stackTop;
		sectionThresholds.push(runningTop);
		runningTop += stackH(section.id) + window.innerHeight;
	}
	// calculate document height needed for dummy
	const dummyH = runningTop; // sections.reduce((h, s, i) => h + s.sectionH, 0);

	//
	// Scroll logic
	//

	let ticking = false,
		scrollY = 0;

	let topSectionIdx = 0;
	let bottomSectionIdx = 1;
	let newSection = false;

	function isSectionChange(indices) {
		return topSectionIdx !== indices[0];
	}

	function updateVisibleSections(indices) {
		if (isSectionChange(indices)) {
			newSection = true;
			topSectionIdx = indices[0];
			bottomSectionIdx = indices[1];
		} else {
			newSection = false;
		}
	}

	function updateStack() {
		ticking = false;
		scrollY = window.scrollY;
		if (!dummyH) return;
		// compute visible components
		const tOffset = layerGap; // to swap out the placeholder before reaching the layers
		const isPastThreshold = (threshold) => scrollY <= threshold;
		let idx = sectionThresholds.findIndex((t) =>
			isPastThreshold(t - tOffset)
		);
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
	<Loading />
{:then _}
	<div class="dummy" style="height: {dummyH}px">
		<div class="top">
			{#if sections[topSectionIdx].component != null}
				<svelte:component this={sections[topSectionIdx].component} {scrollY} />
			{:else}
				<Stack
					section={sections[topSectionIdx]}
					{scrollY}
					{newSection} />
			{/if}
		</div>
		<div class="bottom">
			{#if sections[bottomSectionIdx].component != null}
				<svelte:component this={sections[bottomSectionIdx].component} />
			{:else}
				<Full section={sections[bottomSectionIdx]} {scrollY} {newSection} />
				<Stack
					section={sections[bottomSectionIdx]}
					{scrollY}
					{newSection} />
			{/if}
		</div>
	</div>
{/await}
