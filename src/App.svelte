<script>
	import { fade } from "svelte/transition";

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
	import Content from "./Content.svelte";

	const sections = [
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
			title: "802/red/B",
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
	];

	
	// Asset preload
	function preloadImg(src, cb) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = resolve;
			img.src = src;
			cb(img);
		});
	}

	const preloadQueue = {
		queue: [],
		enqueue: function (pair) {
			this.queue.push(pair);
		},
		process: function () {
			this.queue.forEach((pair) => preloadImg(pair[0], pair[1]));
		},
	};

	function preloadAll() {
		const firstTwo = [];
		for (let [idx, section] of sections.entries()) {
			// skip first (landing) and last (about)
			if (section.layerCount === 0 || section.folder === "") continue;

			const path = `img/layers/`;
			const fullPath = path + `${section.id}_long.jpg`;
			const setFullProp = (img) => (section.full = img);
			section.full = null;
			if (idx < 3) firstTwo.push(preloadImg(fullPath, setFullProp));
			else preloadQueue.enqueue([fullPath, setFullProp]);
			section.layers = [];
			for (let j = 1; j < section.layerCount + 1; j++) {
				const layerPath = path + `${section.id}_${j}.png`;
				const setLayerProp = (img) =>
					(section.layers = [...section.layers, img]);
				if (idx < 3) firstTwo.push(preloadImg(layerPath, setLayerProp));
				else preloadQueue.enqueue([layerPath, setLayerProp]);
			}
		}
		return Promise.all(firstTwo).then(() => preloadQueue.process());
	}

	// Element positions
	const
		layerGap = 300,
		fullH = (section) => section.fullScale * window.innerHeight;

	let ticking = false,
		scrollY = 0,
		windowH = window.innerHeight,
		runningTop = 0;

	for (let section of sections) {
		section.fullTop = runningTop;
		section.fullH = fullH(section);
		section.containerH =
			section.id > 1 ? section.fullH + windowH : section.fullH;
		section.stackTop = section.fullTop + section.containerH - windowH;
		section.contentThreshold =
			section.fullTop + windowH / 2 + (section.id > 1 ? windowH : 0);
		section.showContent = function (y) {
			return (
				y > section.contentThreshold &&
				y < section.contentThreshold + window.innerHeight * 2
			);
		};
		section.showTitle = function (y) {
			return (
				y > section.contentThreshold &&
				y < section.contentThreshold + windowH * 0.8
			);
		};
		runningTop = section.stackTop;
	}

	let aboutTop =
		sections[sections.length - 1].fullTop +
		sections[sections.length - 1].containerH;

	let showBtt = false;

	// Update scroll position variables
	function updateStack() {
		ticking = false;
		if (window.scrollY === scrollY) return;
		scrollY = window.scrollY;
		windowH = window.innerHeight;
		var body = document.body,
			html = document.documentElement;
		var docHeight = Math.max(
			body.scrollHeight,
			body.offsetHeight,
			html.clientHeight,
			html.scrollHeight,
			html.offsetHeight
		);
		showBtt = scrollY > docHeight - window.innerHeight * 4;
	}

	const handleScroll = (evt) => {
		if (!ticking) requestAnimationFrame(updateStack);
		ticking = true;
	};

	// Mobile check
	const mobileCheck = (function (a) {
		return (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		);
	})(navigator.userAgent || navigator.vendor || window.opera);
</script>

<style>
	/* .snap-anchor {
		position: absolute;
		height: 100vh;
		scroll-snap-align: start end;
		scroll-snap-stop: always;
	} */

	.flex-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.bg-container,
	.layer-container {
		position: absolute;
		left: 0;
		width: 100%;
	}

	.bg,
	.layer {
		width: 100%;
		position: sticky;
		top: 0;
	}

	.layer {
		height: 100vh;
	}

	.invisible {
		visibility: hidden;
	}
	.about {
		position: absolute;
		width: 100%;
		left: 0;
		text-align: center;
		padding: 10vh 10vw;
		padding-top: 100vh;
		background: linear-gradient(#666 0%, black 25%);
		z-index: -1000;
	}

	@media screen and (max-height: 800px) {
		.about {
			padding: 5vh 5vw;
			padding-top: 100vh;
		}
	}

	.btt {
		cursor: pointer;
		font-size: 0.7vw;
		position: fixed;
		bottom: 0.7vw;
		right: 0.7vw;
		transform: translate(-50%, 0);
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
		html {
			scroll-behavior: smooth;
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
		a {
			color: #ad8446;
			text-decoration: none;
		}
		a:hover {
			text-decoration: underline;
		}
		a:visited {
			color: #ad8347;
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
		<Landing {scrollY} />
		{#each sections as section, index}
			{#if section.layerCount > 0}
				{#each section.layers as layer, lIndex}
					<div
						class="layer-container"
						style="height: {windowH + lIndex * layerGap}px; top: {section.stackTop}px; z-index: {-index * 4 + 3 - lIndex};">
						<div class="layer">
							<img
								width="100%"
								height="100%"
								src={layer.src}
								alt="fragment" />
						</div>
					</div>
				{/each}
			{/if}
			<section
				class="bg-container"
				class:invisible={scrollY >= section.stackTop}
				style="height: {section.containerH}px; top: {section.fullTop}px; z-index: {-index * 4};">
				<div class="bg" style="height: {section.fullH}px;">
					{#if section.full != null}
						<img
							width="100%"
							height="100%"
							src={section.full.src}
							alt="placeholder" />
					{/if}
					<Content {section} {scrollY} />
				</div>
			</section>
		{/each}
		<section class="about" style="top: {aboutTop}px;">
			<div class="about-bg" />
			<About />
		</section>

		{#if showBtt}
			<div
				class="btt"
				transition:fade
				on:click={() => window.scrollTo(0, 0)}>
				<img
					height="32px"
					width="auto"
					src="img/chevron_up.svg"
					alt="top" /><br /><span>top</span>
			</div>
		{/if}
	{/await}
{/if}
