<script>
    import Stack from "./Stack.svelte";
    import Full from "./Full.svelte";
    export let props;
    export let isTop;
    console.log(props);
</script>

<style>
</style>

<section>
    {#if props.isSpecial}
        <slot />
    {:else if isTop}
        <Stack {props} />
    {:else}
        <Full {props} />
    {/if}
</section>
