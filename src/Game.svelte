<script>
  // import { onMount } from "svelte";
  import * as ttt from "./tictactoe.js";

  import Scoreboard from "./Scoreboard.svelte"

  export let handicap = 80;
  export let playerBegins = true;
  export let delay = 600;

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  let game;
  let state;
  let locked;

  async function newGame(playerBegins = true) {
    game = new ttt.Game(handicap, playerBegins);
    state = game.state; // reset board

    if (!playerBegins) {
      locked = true;
      await sleep(50);
      game.makeMove();
    }
    state = game.state;
    locked = false;
  }

  let stats = {
    computer: 0,
    draw: 0,
    player: 0
  };

  function processResults() {
    if (game.getWinner === ttt.COMPUTER) {
      stats.computer += 1;
    } else if (game.getWinner === ttt.PLAYER) {
      stats.player += 1;
    } else {
      stats.draw += 1;
    }

    console.log(stats);
    // TODO update winning line in GUI
    // let line = game.getWinningLine();
  }

  async function move(i, j) {
    if (!locked) {
      locked = true;
      try {
        let gameFinished = game.playerMove(i, j);
        state = game.state;

        if (gameFinished) {
          processResults();
          await sleep(1000);
          newGame(false);
        } else {
          await sleep(Math.floor((0.6 + 0.4 * Math.random()) * delay));

          gameFinished = game.makeMove();
          state = game.state;

          if (gameFinished) {
            processResults();
            await sleep(1000);
            newGame(true);
          } else {
            locked = false;
          }
        }
      } catch {
        // TODO
      }
    }
  }

  newGame(playerBegins);
</script>

<style>
  :root {
    --HIGHLIGHT-COLOR: #e9e9e9;
  }
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
    background-color: var(--HIGHLIGHT-COLOR);
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
      background-color: var(--HIGHLIGHT-COLOR);
      color: black;
    }
  }

  .played:hover {
    background-color: var(--HIGHLIGHT-COLOR);
  }
</style>

<div>
  <Scoreboard {stats} />
  <p>Handicap = {handicap}</p>
  <table>
    {#each [...Array(3).keys()] as i}
      <tr>
        {#each [...Array(3).keys()] as j}
          <td
            class:played={state[i][j] !== ttt.EMPTY}
            on:click={() => move(i, j)}>
            <!-- <button on:click={() => playField(i, j)}>
            </button> -->
            {@html state[i][j] === ttt.PLAYER ? '&#x0fbe;' : ''}
            {@html state[i][j] === ttt.COMPUTER ? '&#x262f;' : ''}
          </td>
        {/each}
      </tr>
    {/each}
  </table>
</div>
