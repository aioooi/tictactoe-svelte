<script>
  import { onMount } from "svelte";

  export let handicap = 100;

  const EMPTY = 0;
  const HUMAN = 1;
  const COMPUTER = -1;

  // let state = [[...Array(3)].map(() => [...Array(3)].map(() => 0))];
  let state = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

  function playField(i, j) {
    state[i][j] = HUMAN;
    console.log(state);
  }
</script>

<style>
  div {
    padding: 2eM;
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
    width: 1eM;
    height: 1eM;
    font-size: 3eM;
    line-height: 1eM;
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
          <td class:played={state[i][j] != 0}
              on:click|once={() => playField(i, j)}>
            <!-- <button on:click={() => playField(i, j)}>
            </button> -->
            {@html state[i][j] == HUMAN ? '&#x0fbe;' : ''}
            {@html state[i][j] == COMPUTER ? '&#x262f;' : ''}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
