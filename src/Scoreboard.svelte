<script>
  import ScoreboardCell from './ScoreboardCell.svelte';

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
</style>

<div class="grid">
  <ScoreboardCell label={name} value={stats.player} />
  <ScoreboardCell label={'Draw'} value={stats.draw} />
  <ScoreboardCell label={'Computer'} value={stats.computer} />
</div>

