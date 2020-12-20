<script>
    export let offset;
    export let props;
    export let mask;
    import Stack from "./Stack.svelte";
    // image sources
    const path = "img/4_forkrazor/";
    const full = path + "4_full.png";
    const layers = new Array(7).fill().map((_, i) => path + `4_${i + 1}.png`);
</script>

<Stack {mask} {offset} {props} {full} {layers} />
