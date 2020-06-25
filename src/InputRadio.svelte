<script>
  export let label = ["a", "b"];
  export let id;

  id = Math.floor(label.length / 2.0);
</script>

<style>
  .grid {
    width: 38vw;
    min-width: 338px;
    max-width: 38vh;
    margin: 2vh auto;
    display: grid;
    text-align: center;
    /* set dynamically in html below: */
    /* grid-template-columns: 1fr 1fr 1fr; */
    text-transform: uppercase;
    grid-gap: 3px;
    font-size: 11px;
    font-weight: 300;
  }

  .radioBtn {
    display: inline-block;
    text-align: center;
  }

  .radioBtn label {
    display: block;
    margin-bottom: 1em;
  }

  input[type="radio"] {
    -moz-appearance: None;
    -webkit-appearance: none;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 25%;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  input[type="radio"]:checked {
    background: #ffa7a7;
    border: 1px solid #aaa;
  }

  input[type="radio"]:focus {
    outline: none;
  }
</style>

<div class="grid" style="grid-template-columns: repeat({label.length}, 1fr)">
  {#each label.map((v, i) => {
    return { id: i, label: v };
  }) as l (l.id)}
    <div class="radioBtn">
      <label>{l.label}</label>
      <input type="radio" bind:group={id} value={l.id} />
    </div>
  {/each}
</div>
