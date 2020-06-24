<script>
  import Game from "./Game.svelte";
</script>

<style>
  main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<h1>Let's Play: Tic Tac Toe</h1>
<h2>(implemented in Svelte)</h2>
<main>
  <Game />
</main>
