<script>
    export let offset;
    export let props;
    export let mask;
    import Stack from "./Stack.svelte";
    // image sources
    const num = "6";
    const name = "ritter";
    const layerCount = 7;
    const path = `img/${num}_${name}/`;
    const full = path + `${num}_full.png`;
    const layers = new Array(layerCount).fill().map((_, i) => path + `${num}_${i + 1}.png`);
</script>

<Stack {mask} {offset} {props} {full} {layers} />
