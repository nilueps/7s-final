<script>
    import { getContext, beforeUpdate, onMount, onDestroy } from "svelte";

    export let section;
    export let scrollY;
    // const { easing } = getContext("stackVars");

    let fullRef;
    let fullH;

    function styleUpdater() {
        return () => {
            let top = (scrollY < section.fullTop) ? 0 : scrollY - section.fullTop;
            fullRef.style.top = -top + "px";
            // fullRef.style.transition = easing;
        };
    }

    let updateLayerStyles;
    beforeUpdate(() => {
        fullH = window.innerHeight * section.fullScale;
        if (updateLayerStyles != null) updateLayerStyles();
    });

    onMount(() => {
        updateLayerStyles = styleUpdater();
    });
</script>

<style>
    .full {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-size: 3rem;
    }
	.full > img {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

<div bind:this={fullRef} class="full" style="height: {fullH}px;">
    <img width="100%" height="100%" src={section.full.src} alt="placeholder" />
</div>
