<script>
  export let stats = {
    computer: 0,
    draw: 0,
    player: 0
  };

  export let name = "Player";
</script>

<style>
  .grid {
    display: grid;
    text-align: center;
    grid-template-columns: 1fr 1fr 1fr;
    text-transform: uppercase;
    margin: 3em 0;
    grid-gap: 3px;
  }

  .cell {
    padding: 0.3em;
  }
</style>

<div class="grid">
  {#each [name, 'Draw', 'Computer', stats.player, stats.draw, stats.computer] as t}
    <div class="cell">{t}</div>
  {/each}
</div>
