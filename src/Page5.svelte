<script>
  import { onMount } from "svelte";
  import PlaceholderSvg from './PlaceholderSVG.svelte'
  import sketch from "./sketch2.js";
  // onMount(() => sketch("sketch2"));

</script>

<style>
  div {
    height: 100%;
  }
</style>

<div id="sketch2" ><PlaceholderSvg text={"covid"}></PlaceholderSvg></div>
