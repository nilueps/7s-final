<script>
    import { onMount } from "svelte";

    import { fade } from "svelte/transition";

    export let text = "seven spaces";
    export let scrollY;

    let showChevron = false;

    $: visible = scrollY === 0;

    let showScroll = false;
    function handleClick() {
        showScroll = true;
        setTimeout(() => (showScroll = false), 1000);
    }

    onMount(() => setTimeout(() => (showChevron = true), 2000));
</script>

<style>
    .landing {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1;
        overflow: hidden;
        color: white;
        user-select: none;
        font-size: 2rem;
        font-weight: normal;
        background: transparent;
    }

    .title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        letter-spacing: 0.1rem;
    }

    .chevron-icon {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
        font-size: 1.5rem;
        pointer-events: auto;
    }
</style>

{#if visible}
    <div transition:fade class="landing">
        <span class="title">{text}</span>
        {#if showChevron}
            <div class="chevron-icon" on:click="{handleClick}">
                {#if showScroll}
                    <span transition:fade>scroll</span><br />
                {/if}
                <img
                    transition:fade
                    width="70px"
                    height="auto"
                    src="/img/chevron_down.svg"
                    alt="down arrow" />
            </div>
        {/if}
    </div>
{/if}
