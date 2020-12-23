<script>
  import { onMount } from 'svelte'
  import sketch from "./sketch1.js";
  onMount(() => sketch("sketchArea"));
  
</script>

<style>
  div {
    height: 100%;
  }
</style>

<div id="sketchArea" />
