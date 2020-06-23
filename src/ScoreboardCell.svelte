<script>
  import { elasticOut, expoInOut, quartOut } from "svelte/easing";

  export let label = "LABEL";
  export let value = 0;

  function highlight(node, { duration = 300 }) {
    const MAXSCALE = 1.4;

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
    <div class="cell">{label}</div>
    <div class="cell">{value}</div>
  </div>
{/each}
