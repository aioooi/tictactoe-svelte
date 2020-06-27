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
    width: 38vw;
    min-width: 338px;
    max-width: 38vh;
    margin: 4vh auto 2vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    text-transform: uppercase;
    font-weight: 300;
    grid-gap: 3px;
  }
</style>

<div class="grid">
  <ScoreboardCell label={name} value={stats.player} edit={true} />
  <ScoreboardCell label={'Draw'} value={stats.draw} />
  <ScoreboardCell label={'Computer'} value={stats.computer} />
</div>

