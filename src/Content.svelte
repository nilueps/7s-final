<script>
    import { fade } from "svelte/transition";
    import Title from "./Title.svelte";

    export let section;
    export let scrollY;
</script>

<style>
    .shade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(12, 12, 12, 0.8);
        z-index: 1;
    }

    .content {
        position: absolute;
        width: 100%;
        height: 100vh;
        padding: 10vh 10vw;
        z-index: 2;
    }
</style>

{#if section.showContent(scrollY)}
    <div transition:fade class="shade" />
    <div transition:fade class="content" style="top: {window.innerHeight}px;">
        <Title {section} {scrollY} />
        <svelte:component this={section.content} />
    </div>
{/if}
