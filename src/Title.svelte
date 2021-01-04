<script>
    import { fade } from "svelte/transition";

    export let section;
    export let scrollY;
</script>

<style>
    .sticker {
        height: 100vh;
        padding-bottom: 15rem;
    }
    h2 {
        position: -webkit-sticky;
        position: sticky;
        top: 50vh;
        font-size: 4rem;
        font-style: normal;
        font-weight: 400;
        height: min-content;
        text-align: center;
        letter-spacing: 0.1rem;
    }
</style>

<div class="sticker">
    <h2>
        {#if true}<span transition:fade>{section.title}</span>{/if}
    </h2>
</div>
