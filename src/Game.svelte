<script>
  import * as ttt from "../lib/tictactoe/tictactoe.js";

  import InputRadio from "./InputRadio.svelte";
  import Scoreboard from "./Scoreboard.svelte";

  export let handicap = 80;
  export let playerBegins = true;
  export let delay = 300;

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  let game;
  let state;
  let finalState;
  let locked;

  let playerBeginsAfterDraw = true;

  async function newGame(playerBegins = true) {
    game = new ttt.Game(handicap, playerBegins);
    state = game.state;
    finalState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    if (!playerBegins) {
      locked = true;
      await sleep(50);
      game.makeMove();
    }

    state = game.state;
    locked = false;
  }

  let stats;

  const resetStats = () => {
    stats = {
      computer: 0,
      draw: 0,
      player: 0
    };
  };

  async function processResults() {
    let playerBegins = true;
    if (game.winner === ttt.COMPUTER) {
      stats.computer += 1;
    } else if (game.winner === ttt.PLAYER) {
      stats.player += 1;
      playerBegins = false;
    } else {
      stats.draw += 1;
      playerBegins = playerBeginsAfterDraw;
      playerBeginsAfterDraw = !playerBeginsAfterDraw;
    }

    finalState = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    if (game.winner !== ttt.EMPTY) {
      let line = game._winningLine;

      line.forEach(e => {
        finalState[Math.floor(e / 3)][e % 3] = 1;
      });
    }

    await sleep(1200);
    newGame(playerBegins);
  }

  async function move(i, j) {
    if (!locked) {
      locked = true;
      try {
        let gameFinished = game.playerMove(i, j);
        state = game.state;

        if (gameFinished) {
          processResults();
        } else {
          await sleep(Math.floor((0.6 + 0.4 * Math.random()) * delay));
          gameFinished = game.makeMove();
          state = game.state;

          if (gameFinished) {
            processResults();
          } else {
            locked = false;
          }
        }
      } catch (e) {
        console.error(e);
        locked = false;
      }
    }
  }

  const levels = [
    { label: "trivial", handicap: 90 },
    { label: "easy", handicap: 65 },
    { label: "medium", handicap: 48 },
    { label: "hard", handicap: 24 },
    { label: "impossible", handicap: 5 }
  ];

  let currentLevel = 0;

  $: {
    console.log(`level selected ${currentLevel}`);
    handicap = levels[currentLevel].handicap;
    resetStats();
    newGame(playerBegins);
  }
</script>

<style>
  :root {
    --PLAYED-COLOR: #e9e9e9;
    --HIGHLIGHT-COLOR: #ffa7a7;
    --HOVER-COLOR: #fff5f5;
    --MARKER-COLOR: #black;
  }

  .board {
    margin: 0 auto;
    padding: 0;
    width: 40vw;
    height: 40vw;
    max-width: 40vh;
    max-height: 40vh; 
    min-width: 308px;
    min-height: 308px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 4px;
  }

  .square {
    position: relative;
    width: auto;
    height: auto;
    background-color: white;
    border: 1px solid #c4c4c4;
    border-radius: 4%;
    cursor: pointer;
    color: white;
    box-shadow: 2px 2px 4px #bbb;
  }

  .square:hover {
    background-color: var(--HOVER-COLOR);
    box-shadow: 1px 1px 2px #aaa;
  }

  .tag {
    /* border: 1px dashed magenta; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5vw;
    line-height: 5vw;
  }

  .played {
    background-color: var(--PLAYED-COLOR);
    cursor: auto;
    color: var(--MARKER-COLOR);
    animation: click 300ms ease-out;
    /* delay iteration-count direction fill-mode; */
  }

  @keyframes click {
    from {
      background-color: var(--HIGHLIGHT-COLOR);
      color: #fff5f5;
    }
    to {
      background-color: var(--PLAYED-COLOR);
      color: var(--MARKER-COLOR);
    }
  }

  .played:hover {
    background-color: var(--PLAYED-COLOR);
  }

  .highlight-winning-line {
    animation: winning-line 800ms ease-in-out 1;
  }

  @keyframes winning-line {
    0% {
      background-color: var(--PLAYED-COLOR);
      color: var(--MARKER-COLOR);
    }
    50% {
      background-color: var(--HIGHLIGHT-COLOR);
      color: #fff5f5;
    }
    100% {
      background-color: var(--PLAYED-COLOR);
      color: var(--MARKER-COLOR);
    }
  }
</style>

<div>
  <div class="board">
    {#each [...Array(3).keys()] as i}
      {#each [...Array(3).keys()] as j}
        <div
          class="square"
          class:played={state[i][j] !== ttt.EMPTY}
          class:highlight-winning-line={finalState[i][j] === 1}
          on:click={() => move(i, j)}>
          <div class="tag">
            {@html state[i][j] === ttt.PLAYER ? '&#x0fbe;' : ''}
            {@html state[i][j] === ttt.COMPUTER ? '&#x262f;' : ''}
          </div>
        </div>
      {/each}
    {/each}
  </div>
  <Scoreboard {stats} />
  <InputRadio bind:id={currentLevel} label={levels.map(v => v.label)} />
</div>
