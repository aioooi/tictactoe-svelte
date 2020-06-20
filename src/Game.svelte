<script>
  // import { onMount } from "svelte";
  import * as ttt from "./tictactoe.js";

  export let handicap = 100;

  function playField(i, j) {
    game.humanMove(i, j);
    state = game.state;
  }

  let game = new ttt.Game(handicap);
  let state = game.state;
</script>

<style>
  div {
    padding: 2em;
    background-color: pink;
  }

  table {
    margin: 0 auto; /* center the able with auto left right margin */
    border-collapse: collapse;
    border: 1px solid #656565;
  }

  tr {
    margin: 0;
    padding: 0;
  }

  td {
    width: 1em;
    height: 1em;
    font-size: 3em;
    line-height: 1em;
    border: 3px solid #c4c4c4;
    margin: 0;
    padding: 1em;
    cursor: pointer;
  }

  .played {
    background-color: #e9e9e9;
    cursor: auto;
  }
</style>

<div>
  <p>Handicap = {handicap}</p>
  <table>
    {#each [...Array(3).keys()] as i}
      <tr>
        {#each [...Array(3).keys()] as j}
          <td class:played={state[i][j] !== ttt.EMPTY}
              on:click|once={() => playField(i, j)}>
            <!-- <button on:click={() => playField(i, j)}>
            </button> -->
            {@html state[i][j] === ttt.HUMAN ? '&#x0fbe;' : ''}
            {@html state[i][j] === ttt.COMPUTER ? '&#x262f;' : ''}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
