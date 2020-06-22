<script>
  import * as ttt from "./tictactoe.js";

  import Scoreboard from "./Scoreboard.svelte"

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
  <div class="board">
    {#each [...Array(3).keys()] as i}
      {#each [...Array(3).keys()] as j}
        <div class="square"
          class:played={state[i][j] !== ttt.EMPTY && finalState[i][j] === 0}
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
</div>


<style>
  .board {
    margin: auto;
    padding: 0;
    width: 50vw;
    height: 50vw;
    max-width: 50vh;
    max-height: 50vh;
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
    box-shadow: 3px 3px 5px #999;
  }
  
  .square:hover {
    background-color: var(--HIGHLIGHT-COLOR);
    box-shadow: 1px 1px 2px #999;
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

  :root {
    --HIGHLIGHT-COLOR: #e9e9e9;
    --MARKER-COLOR: #black;
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
