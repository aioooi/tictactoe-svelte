<script>
  import { elasticOut, expoInOut, quartOut } from "svelte/easing";

  import Input from './Input.svelte';

  export let label = "LABEL";
  export let value = 0;

  export let edit = false;
  let disabled = !edit;

  function highlight(node, { duration = 400 }) {
    const MAXSCALE = 1.6;

    return {
      duration,
      css: t => {
        // const s = elasticOut(t);
        // const s = expoInOut(t);
        const s = quartOut(t);

        return `
           transform: scale(${MAXSCALE - (MAXSCALE - 1.0) * s});
        `;
      }
    };
  }
</script>

<style>
  .cell {
    padding: 0.4em;
  }
</style>

{#each [value] as v (v)}
  <div in:highlight >
    {#if edit}
      <Input bind:value={label} bind:disabled={disabled} />
    {:else}
      <div class="cell">{@html label }</div>
    {/if}
    <div class="cell">{value}</div>
  </div>
{/each}
