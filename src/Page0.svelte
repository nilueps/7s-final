<script>
    import Stack from "./Stack.svelte";
    import Full from "./Full.svelte";
    export let props;
    export let isTop;
    const num = "1";
    const name = "bergintro";
    const layerCount = 7;
    const path = `img/${num}_${name}/`;
    const full = path + `${num}_double.png`;
    const layers = new Array(layerCount)
        .fill()
        .map((_, i) => path + `${num}_${i + 1}.png`);
</script>

{#if isTop}
    <Stack {layers}section{props} />
{:else}
    <Full {full}section{props} />
{/if}
