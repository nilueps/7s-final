<script>
    import { fade } from "svelte/transition";
    
    export let showTitle;
    export let title;
</script>

<style>
    .sticker {
        height: 100vh;
        padding-bottom: 5rem;
    }
    h2 {
        position: sticky;
        top: 50vh;
        text-align: center;
        /* letter-spacing: 1rem; */
        font-size: 2rem;
        /* margin-bottom: 2rem; */
        /* margin-left: 5rem; */
    }
</style>

<div class="sticker">
    {#if showTitle}
    <h2 transition:fade>{title}</h2>
    {/if}

</div>