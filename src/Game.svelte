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
  let finalState;
  let locked;

  async function newGame(playerBegins = true) {
    game = new ttt.Game(handicap, playerBegins);
    state = game.state; 
    finalState = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    
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

  async function processResults() {
    if (game.winner === ttt.COMPUTER) {
      stats.computer += 1;
    } else if (game.winner === ttt.PLAYER) {
      stats.player += 1;
    } else {
      stats.draw += 1;
    }

    let line = game._winningLine;
    finalState = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]

    line.forEach(e => {
        finalState[Math.floor(e / 3)][e % 3] = 1;
    });
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


<div>
  <Scoreboard {stats} />
  <p>Handicap = {handicap}</p>
  <table>
    {#each [...Array(3).keys()] as i}
      <tr>
        {#each [...Array(3).keys()] as j}
          <td
            class:played={state[i][j] !== ttt.EMPTY && finalState[i][j] === 0}
            class:highlight-winning-line={finalState[i][j] === 1}
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


<style>
  :root {
    --HIGHLIGHT-COLOR: #e9e9e9;
    --MARKER-COLOR: #black;
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
    font-size: 7vw;
    line-height: 7vw;
    border: 3px solid #c4c4c4;
    margin: 0;
    padding: 0em;
    cursor: pointer;
    color: white;
  }

  td:hover {
    background-color: #f2f2f2;
  }

  .played {
    background-color: var(--HIGHLIGHT-COLOR);
    cursor: auto;
    color: var(--MARKER-COLOR);
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
      color: var(--MARKER-COLOR);
    }
  }

  .played:hover {
    background-color: var(--HIGHLIGHT-COLOR);
  }

  .highlight-winning-line {
    animation: winning-line 500ms ease-in-out 2;
    /* border-color: blue; */
  }

  @keyframes winning-line {
    0% {
      background-color: var(--HIGHLIGHT-COLOR);
      color: var(--MARKER-COLOR);
    }
    50% {
      background-color: rgb(255, 93, 93);
      color: rgb(206, 169, 175);
    }
    100% {
      background-color: var(--HIGHLIGHT-COLOR);
      color: var(--MARKER-COLOR);
    }
  }
</style>
