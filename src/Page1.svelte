<script>
  import { onMount } from "svelte";
  import PlaceholderSvg from "./PlaceholderSVG.svelte";
  // import sketch from "./sketch1.js";
  // onMount(() => sketch("sketchArea"));
</script>

<style>
  div {
    height: 100%;
  }
</style>

<div id="sketchArea">
  <iframe
    title="berg"
    width="100%"
    height="100%"
    style="border: none;"
    src="https://editor.p5js.org/intermodal/embed/Z9VmIYhue" />
</div>
