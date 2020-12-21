<script>
    import { getContext, beforeUpdate, onMount, onDestroy } from "svelte";

    export let props;
    $: offset = props.offset;
    const { easing } = getContext("stackVars")



    let fullRef;
    const fullH = window.innerHeight * props.yScale;

    function isBigJump(a, b) {
        const A = Math.abs(Math.max(a, b));
        const B = Math.abs(Math.min(a, b));
        return A - B >= 0.8 * window.innerHeight;
    }

    function layerTop() {
        if (offset > window.innerHeight) {
            return offset - window.innerHeight;
        } else {
            return 0;
        }
    }

    function styleUpdater() {
        const tops = [];
        return () => {
            const top = offset;
            fullRef.style.top = -top + "px";
            fullRef.style.transition = easing;
        };
    }

    let updateLayerStyles;
    beforeUpdate(() => {
        if (updateLayerStyles != null) updateLayerStyles();
    });

    onMount(() => {
        updateLayerStyles = styleUpdater();
        fullRef.appendChild(props.full);
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
    .full img {
			width: 100vw;
			height: auto;
		}
</style>

<div bind:this={fullRef} class="full" style="height: {fullH}px;"><img src={props.full.src} alt="placeholder"/></div>
