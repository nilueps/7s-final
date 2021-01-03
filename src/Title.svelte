<script>
    import { fade } from "svelte/transition";

    export let section;
    export let scrollY;
</script>

<style>
    .sticker {
        height: 100vh;
        padding-bottom: 5rem;
    }
    h2 {
        position: -webkit-sticky;
        position: sticky;
        top: 50vh;
        font-size: 2rem;
        height: min-content;
        text-align: center;
    }
</style>

<div class="sticker">
    <h2>
        {#if section.showTitle(scrollY)}<span transition:fade>{section.title}</span>{/if}
    </h2>
</div>
