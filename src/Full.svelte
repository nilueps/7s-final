<script>
    import { getContext, beforeUpdate, onMount, onDestroy } from "svelte";
    import { fade } from "svelte/transition";

    export let section;
    export let scrollY;
    export let newSection;
    const { easing } = getContext("stackVars");
    $: transition = newSection ? "initial" : "top ease 200ms";
    const contentMarginTop = window.innerHeight * 0.1;
    $: contentTop = 
        section.fullScale > 1 ? window.innerHeight : 0; // ~~margin-top: 10vh
    $: contentThreshold = contentTop === 0 ? section.fullTop - window.innerHeight / 2 : section.fullTop + contentTop / 2 ;
    $: showContent =
        scrollY >= contentThreshold &&
        scrollY < contentThreshold + window.innerHeight;

    let fullRef;
    let fullH;

    function styleUpdater() {
        return () => {
            let top = scrollY < section.fullTop ? 0 : scrollY - section.fullTop;
            fullRef.style.top = -top + "px";
            fullRef.style.transition = transition;
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
        z-index: 1;
    }
    .full > img {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .content {
        position: absolute;
        left: 10vw;
        width: 80vw;
        height: 80vh;
        z-index: 1;
    }
</style>

<div bind:this={fullRef} class="full" style="height: {fullH}px;">
    <img width="100%" height="100%" src={section.full.src} alt="placeholder" />
    {#if showContent}
        <div transition:fade class="content" style="top: {contentMarginTop + contentTop}px;">
            <svelte:component this={section.content} />
        </div>
    {/if}
</div>
