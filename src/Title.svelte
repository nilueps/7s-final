<script>
    import { fade } from "svelte/transition";

    export let showTitle;
    export let title;
</script>

<style>
    .sticker {
        height: 100vh;
        padding-bottom: 5rem;
        flex: 1;
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
        {#if showTitle}<span transition:fade>{title}</span>{/if}
    </h2>
</div>
