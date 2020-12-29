<script>
    import { getContext, beforeUpdate, onMount } from "svelte";
    import { fade } from "svelte/transition";
    import Title from "./Title.svelte";

    export let section;
    export let scrollY;
    export let newSection;
    $: transition = newSection ? "initial" : "top ease 200ms";
    $: contentTop = section.fullScale > 1 ? window.innerHeight : 0; // ~~margin-top: 10vh
    $: contentThreshold =
        contentTop === 0
            ? section.fullTop - window.innerHeight / 2
            : section.fullTop + contentTop / 2;
    $: showContent =
        scrollY >= contentThreshold &&
        scrollY < contentThreshold + window.innerHeight;

    let fullRef;
    let fullH;

    function styleUpdater() {
        return () => {
            if (fullRef == null) return;
            let top = scrollY - section.fullTop
            if (top < 0) top = 0;
            if (top > section.fullH - window.innerHeight) top = section.fullH - window.innerHeight; 
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
    .noshowcase {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
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
    .content {
        position: absolute;
        width: 100%;
        height: 100vh;
        padding: 10vh 10vw;
    }
    .shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(12, 12, 12, 0.8);
    }
</style>

<div bind:this={fullRef} class="full" style="height: {fullH}px;">
    {#if section.noShowcase == null}
        {#if section.full != null}
            <img
                width="100%"
                height="100%"
                src={section.full.src}
                alt="placeholder" />
        {/if}
        {#if showContent}
            <div transition:fade class="shade" />
            <div transition:fade class="content" style="top: {contentTop}px;">
                <div class="blank" />
                <Title title={section.title} />
                <svelte:component this={section.content} />
            </div>
        {/if}
    {:else}
        <div
            transition:fade
            class="noshowcase"
            style="top: 0px;">
            <svelte:component this={section.content} />
        </div>
    {/if}
</div>
