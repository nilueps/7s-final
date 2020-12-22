<script>
    import { getContext, beforeUpdate, onMount, onDestroy } from "svelte";

    export let section;
    export let scrollY;
    // const { easing } = getContext("stackVars");
    $:src = section.full;
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
        if (fullRef != null && fullRef.firstChild != src) {
            console.log("replacing", fullRef.firstChild, src)
            fullRef.replaceChild(src, fullRef.firstChild)
        }
        fullH = window.innerHeight * section.fullScale;
        if (updateLayerStyles != null) updateLayerStyles();
    });

    onMount(() => {
        fullRef.appendChild(src)
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
</style>

<div bind:this={fullRef} class="full" style="height: {fullH}px;">
    <!-- <img {src} alt="bg"/> -->
    <!-- <img width="100%" height="100%" src={section.full.src} alt="placeholder" /> -->
</div>
