<script>
  // import { onMount } from "svelte";
  import * as ttt from "./tictactoe.js";

  export let handicap = 50;
  export let humanBegins = true;
  export let delay = 600;

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  let game = new ttt.Game(handicap, humanBegins);
  let state = game.state;
  let locked = game.turn === ttt.COMPUTER ? true : false;

  function newGame(humanBegins = true) {
    game = new ttt.Game(handicap, humanBegins);
    state = game.state;
    locked = game.turn === ttt.COMPUTER ? true : false;
  }

  async function playField(i, j) {
    if (!locked) {
      locked = true;
      try {
        let gameFinished = game.playerMove(i, j);
        state = game.state;

        if (gameFinished) {
          let winner = game.getWinner();
          let line = game.getWinningLine();

          // TODO treat result
        } else {
          await sleep(Math.floor((0.6 + 0.4 * Math.random()) * delay));

          gameFinished = game.makeMove();
          state = game.state;

          if (gameFinished) {
            let winner = game.getWinner();
            let line = game.getWinningLine();

            // treat result
          } else {
            locked = false;
          }
        }
      } catch {
        // TODO
      }
    }
  }
</script>

<style>
  div {
    padding: 3vw;
    /* background-color: pink; */
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
    width: 10vw;
    height: 10vw;
    font-size: 6vw;
    line-height: 6vw;
    border: 3px solid #c4c4c4;
    margin: 0;
    padding: 1em;
    cursor: pointer;
    color: white;
  }

  td:hover {
    background-color: #f2f2f2;
  }

  .played {
    background-color: #e9e9e9;
    cursor: auto;
    color: black;
    animation: click 300ms ease-out;
    /* delay iteration-count direction fill-mode; */
  }

  @keyframes click {
    from {
      background-color: rgb(224, 133, 148);
      color: rgb(206, 169, 175);
    }
    to {
      background-color: #e9e9e9;
      color: black;
    } 
  }
  .played:hover {
    background-color: #e9e9e9;
  }
</style>

<div>
  <p>Handicap = {handicap}</p>
  <table>
    {#each [...Array(3).keys()] as i}
      <tr>
        {#each [...Array(3).keys()] as j}
          <td
            class:played={state[i][j] !== ttt.EMPTY}
            on:click={() => playField(i, j)}>
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
