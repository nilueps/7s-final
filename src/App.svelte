<script>
	import { onMount, setContext } from "svelte";
	import { fade } from "svelte/transition";

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
			fullScale: 0,
			component: Landing,
		},
		{
			id: 1,
			title: "206/754",
			folder: "bergintro",
			variation: "triple",
			layerCount: 3,
			fullScale: 4.0,
			content: Page1,
		},
		{
			id: 2,
			title: "nd vibra",
			folder: "ndvibra",
			variation: "full",
			layerCount: 3,
			fullScale: 4.0,
			content: Page2,
		},
		{
			id: 3,
			title: "802/Red/B",
			folder: "red",
			variation: "full",
			layerCount: 3,
			fullScale: 4.0,
			content: Page3,
		},
		{
			id: 4,
			title: "fork razor",
			folder: "forkrazor",
			variation: "full",
			layerCount: 3,
			fullScale: 4.0,
			content: Page4,
		},
		{
			id: 5,
			title: "4435, 10, upper",
			folder: "covid",
			variation: "full",
			layerCount: 3,
			fullScale: 4.0,
			content: Page5,
		},
		{
			id: 6,
			title: "ritter, gabo",
			folder: "ritter",
			variation: "full",
			layerCount: 3,
			fullScale: 4.0,
			content: Page6,
		},
		{
			id: 7,
			title: "memory",
			folder: "memory",
			variation: "full",
			layerCount: 3,
			fullScale: 4.0,
			content: Page7,
		},
		{
			id: 8,
			title: "about",
			folder: "",
			variation: "full",
			layerCount: 0,
			fullScale: 5,
			noShowcase: true,
			content: About,
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
		const firstTwo = [];
		const remainder = [];
		for (let [idx, section] of sections.entries()) {
			// skip first (landing) and last (about)
			if (section.id === 0 || section.id === sections.length - 1)
				continue;

			const path = `img/layers/`;
			const fullPath = path + `${section.id}_long.jpg`;
			const setFullProp = (img) => (section.full = img);
			section.full = null;
			const promise = preloadImg(fullPath, setFullProp);
			if (idx < 3) firstTwo.push(promise);

			section.layers = [];
			for (let j = 1; j < section.layerCount + 1; j++) {
				const layerPath = path + `${section.id}_${j}.png`;
				const setLayerProp = (img) =>
					(section.layers = [...section.layers, img]);
				const promise = preloadImg(layerPath, setLayerProp);
				if (idx < 3) firstTwo.push(promise);
			}
		}
		return Promise.all(firstTwo);
	}

	//
	// global 	context vars
	//
	const layerGap = 300;
	const easing = "top ease 200ms"; // cubic-bezier(.55,.06,.68,.19) 0s";
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
		section.fullH = fullH(section.id);
		section.fullTop = runningTop;
		section.stackTop =
			section.fullTop + fullH(section.id) - window.innerHeight + layerGap;
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
		const tOffset = 0; // to swap out the placeholder before reaching the layers
		const isPastThreshold = (threshold) => scrollY <= threshold;
		let idx = sectionThresholds.findIndex((t) =>
			isPastThreshold(t - tOffset)
		);
		if (idx === -1) idx = sections.length - 1;
		else if (idx < 1) idx = 1;
		updateVisibleSections([idx - 1, idx]);
	}

	const handleScroll = (evt) => {
		if (!ticking) requestAnimationFrame(updateStack);
		ticking = true;
	};

	// mobile check
	const mobileCheck = (function (a) {
		return (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
	})(
		navigator.userAgent || navigator.vendor || window.opera
	);
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
		pointer-events: none;
		z-index: 2;
	}

	.bottom {
		z-index: 1;
	}
	#pagetop {
		position: absolute;
		top: 0;
	}
	.flex-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>

<svelte:head>
	<style>
		:root {
			--mainbgcolor: #666666;
		}

		* {
			box-sizing: border-box;
			font-family: "Spectral", serif;
			line-height: 1.2;
			margin: 0;
			padding: 0;
		}

		html,
		body {
			text-align: center;
			font-size: 100%;
			color: white;
			background: var(--mainbgcolor);
			scroll-snap-type: y proximity;
		}

		iframe {
			border: none;
			border-radius: 0.2rem;
			width: 100%;
			height: 100%;
		}
	</style>
</svelte:head>
<svelte:window on:scroll={handleScroll} />
{#if mobileCheck}
	<div class="flex-container">
		<p style="margin: 0 2rem;">
			Seven Spaces is a multimedia album for the web. To see it, please
			visit seven-spaces.net on a computer.
		</p>
	</div>
{:else}
	{#await preloadAll()}
		<Loading />
	{:then _}
		<div
			transition:fade
			id="dummy"
			class="dummy"
			style="height: {dummyH}px">
			<div id="pagetop" />
			<div class="top">
				{#if sections[topSectionIdx].component != null}
					<svelte:component
						this={sections[topSectionIdx].component}
						{scrollY} />
				{:else}
					<Stack
						section={sections[topSectionIdx]}
						{scrollY}
						{newSection} />
				{/if}
			</div>
			<div class="bottom">
				{#if sections[bottomSectionIdx].layerCount > 0}
					<Stack
						section={sections[bottomSectionIdx]}
						{scrollY}
						{newSection} />
				{/if}

				<Full
					section={sections[bottomSectionIdx]}
					{scrollY}
					{newSection} />
			</div>
		</div>
	{/await}
{/if}
