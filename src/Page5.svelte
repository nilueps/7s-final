<script>
  import { onMount } from "svelte";
  import PlaceholderSvg from './PlaceholderSVG.svelte'
  // import sketch from "./sketch2.js";
  // onMount(() => sketch("sketcharea"));

</script>

<style>
  div {
    height: 100%;
  }
</style>

<div id="sketcharea" ><PlaceholderSvg text={"covid"}/></div>
